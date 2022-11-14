import { Pagination, Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

export default function TableData({
  searchData,
  onSearchUser,
  sortTable,
  onSortColumn,
  isLoading,
  data,
  limitPage,
  page,
  setPage,
  onChangeLimit,
}) {
  return (
    <div className="rs-user-table">
      <Table
        autoHeight
        affixHeader
        affixHorizontalScrollbar
        data={onSearchUser(searchData)}
        sortColumn={sortTable.sortColumn}
        sortType={sortTable.sortType}
        onSortColumn={onSortColumn}
        loading={isLoading}
        width={600}
      >
        <Column sortable>
          <HeaderCell>No</HeaderCell>
          <Cell dataKey="userId" />
        </Column>
        <Column minWidth={100} sortable>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="fName" />
        </Column>
        <Column width={100} sortable>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lName" />
        </Column>
        <Column width={250} sortable>
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
  );
}
