import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

export default function TableHead({ width, sortable, columnName, dataKey }) {
  return (
    <Column width={width} sortable={sortable}>
      <HeaderCell>{columnName}</HeaderCell>
      <Cell dataKey={dataKey} />
    </Column>
  );
}
