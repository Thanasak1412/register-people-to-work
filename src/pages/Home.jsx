import { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from 'rsuite';

import NavigationBar from '../components/Navbar';
import RegisterModal from '../components/RegisterModal';
import ReserveWork from '../components/ReserveWork';
import TableData from '../components/TableData';

export default function Home() {
  const [data, setData] = useState([]);
  const [modalBooking, setModalBooking] = useState(false);
  const positionRef = useRef('');
  const [searchData, setSearchData] = useState('');
  const [sortTable, setSortTable] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [limitPage, setLimitPage] = useState(10);
  const [page, setPage] = useState(1);

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

  const onOpenModalBooking = (event) => {
    positionRef.current = event.currentTarget.id;
    setModalBooking(true);
  };

  const onChangeLimit = (pageLength) => {
    setPage(1);
    setLimitPage(pageLength);
  };

  const onCloseModalBooking = () => {
    setModalBooking(false);
  };

  const onSearchChange = (value) => {
    setSearchData(value);
  };

  const onSortColumn = (sortColumn, sortType) => {
    setIsLoading(true);

    setTimeout(() => {
      setSortTable({ sortColumn, sortType });
      setIsLoading(false);
    }, 500);
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
      }

      return data;
    },
    [data]
  );

  useEffect(() => {
    onSearchUser();
  }, [searchData, onSearchUser]);

  useEffect(() => {
    filterLimitPage();
  }, [filterLimitPage]);

  return (
    <>
      <NavigationBar />
      <div className="container mx-auto mt-16">
        <div className="flex gap-4">
          <div className="flex-2">
            {/* SEARCH && TABLE */}
            <Input
              type="text"
              placeholder="Search data"
              value={searchData}
              onChange={onSearchChange}
              className="mb-3 w-full md:w-2/4"
            />
            <TableData
              searchData={searchData}
              onSearchChange={onSearchChange}
              onSearchUser={onSearchUser}
              sortTable={sortTable}
              onSortColumn={onSortColumn}
              isLoading={isLoading}
              data={data}
              limitPage={limitPage}
              page={page}
              setPage={setPage}
              onChangeLimit={onChangeLimit}
            />
          </div>
          <div className="flex-1 bg-[#F0F0F7] rounded-2xl h-100">
            <div className="grid grid-cols-8 gap-2 p-5 pr-0">
              {/* RESERVED WORK */}
              <ReserveWork
                data={data}
                onOpenModalBooking={onOpenModalBooking}
              />
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
    </>
  );
}
