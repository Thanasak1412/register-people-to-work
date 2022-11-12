import { useCallback, useEffect, useState, useRef } from 'react';

import { Button, Input, Pagination, Table } from 'rsuite';
import { ExpandOutline, UserInfo } from '@rsuite/icons';

import './App.css';

import { mockUsers } from './_mock/_user';
import RegisterModal from './components/RegisterModal';

const { Column, HeaderCell, Cell } = Table;
const defaultData = mockUsers(100);

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const [sortTable, setSortTable] = useState({});
  const [searchData, setSearchData] = useState('');
  const [bookingStatus, setBookingStatus] = useState('empty');
  const [modalBooking, setModalBooking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const positionRef = useRef('');

  const onChangeLimit = (pageLength) => {
    setPage(1);
    setLimitPage(pageLength);
  };

  const onSortColumn = (sortColumn, sortType) => {
    setIsLoading(true);

    setTimeout(() => {
      setSortTable({ sortColumn, sortType });
      setIsLoading(false);
    }, 500);
  };

  const filterLimitPage = useCallback(
    (i) => {
      setIsLoading(true);

      return setTimeout(() => {
        const start = limitPage * (page - 1);
        const end = start + limitPage;

        setIsLoading(false);
        return i >= start && i < end;
      }, 100);
    },
    [limitPage, page]
  );

  const onSearchChange = (value) => {
    setSearchData(value);
  };

  const onSearchUser = useCallback(
    (value) => {
      if (!!value) {
        value = value.toLowerCase().trim();
        if (value === '') return data;

        return data.filter((item) =>
          Object.keys(item).some((key) =>
            item[key].toString().toLowerCase().includes(value)
          )
        );
      } else {
        return data;
      }
    },
    [data]
  );

  const getUsers = useCallback(() => {
    const { sortColumn, sortType } = sortTable;

    if (sortColumn && sortType) {
      const sortedData = data
        .sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];

          if (typeof x === 'string') {
            x = x.charCodeAt();
          }

          if (typeof y === 'string') {
            y = y.charCodeAt();
          }

          if (sortType === 'asc') {
            return x - y;
          }

          return y - x;
        })
        .filter((_, i) => filterLimitPage(i));

      setData(sortedData);
    } else {
      setData(data.filter((_, i) => filterLimitPage(i)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortTable, filterLimitPage]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    filterLimitPage();
  }, [filterLimitPage]);

  useEffect(() => {
    onSearchUser();
  }, [searchData, onSearchUser]);

  const ICON_STATUS = {
    reserved: <UserInfo className="w-5 h-5" />,
    empty: <ExpandOutline className="w-5 h-5" />,
  };

  const onOpenModalBooking = (event) => {
    positionRef.current = event.currentTarget.id;
    setModalBooking(true);
  };

  const onCloseModalBooking = () => {
    setModalBooking(false);
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="flex gap-4">
        <div className="flex-2">
          <Input
            type="text"
            placeholder="Search data"
            value={searchData}
            onChange={onSearchChange}
            className="mb-3 w-full md:w-2/4"
          />
          <Table
            height={420}
            width={600}
            data={onSearchUser(searchData)}
            sortColumn={sortTable.sortColumn}
            sortType={sortTable.sortType}
            onSortColumn={onSortColumn}
            loading={isLoading}
          >
            <Column width={80} sortable>
              <HeaderCell>No</HeaderCell>
              <Cell dataKey="userId" />
            </Column>
            <Column width={120} sortable>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="fName" />
            </Column>
            <Column width={120} sortable>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="lName" />
            </Column>
            <Column width={270} sortable>
              <HeaderCell className="text-center">Phone</HeaderCell>
              <Cell dataKey="phone" />
            </Column>
          </Table>
          <div className="p-4">
            <Pagination
              prev
              next
              first
              last
              ellipsis
              maxButtons={5}
              size="xs"
              layout={['total', '-', 'limit', '|', 'pager', 'skip']}
              total={data.length}
              limit={limitPage}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={onChangeLimit}
              limitOptions={[10, 30, 50, 100]}
            />
          </div>
        </div>
        <div className="flex-1 bg-[#F0F0F7] rounded-2xl h-100">
          <div className="grid grid-cols-8 gap-2 p-5 pr-0">
            {defaultData.map((data) => (
              <div
                key={data.userId}
                className="rounded-md bg-sky-400/70 w-10 h-10"
              >
                <Button
                  appearance="default"
                  id={data.userId}
                  onClick={onOpenModalBooking}
                >
                  {ICON_STATUS[bookingStatus]}
                  <div className="text-gray-500 text-xs absolute -top-1 right-2">
                    {data.userId}
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RegisterModal
        open={modalBooking}
        onCloseModalBooking={onCloseModalBooking}
        setData={setData}
        ref={positionRef}
      />
    </div>
  );
}

export default App;
