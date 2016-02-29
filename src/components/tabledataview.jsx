import React from 'react'
import { Table } from 'react-bootstrap';

let TableDataView = props => {
  let { columns, rows } = props;

  if(!columns) { return <div />; }
  if(!rows) { rows = []; }

  return (
    <Table>
      <thead>
        <tr>{ columns.map((col, idx) => (
          <th key={idx}>{ col.name }</th>
        )) }</tr>
      </thead>
      <tbody>{ rows.map((row, rowIdx) => (
          <tr>{ row.map((cell, cellIdx) => (
            columns[cellIdx].format ? columns[cellIdx].format(cell) : cell
          )) }</tr>
        )) }
      </tbody>
    </Table>
  );
}

TableDataView.propTypes = {
  columns: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    format: React.PropTypes.func,
  })),
  rows: React.PropTypes.arrayOf(React.PropTypes.arrayOf(
    React.PropTypes.object)),
};

export default TableDataView;
