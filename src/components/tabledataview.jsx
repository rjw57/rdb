import React from 'react'
import { Table } from 'react-bootstrap';

let TableDataView = props => {
  return (<Table>
  </Table>);
};

TableDataView.propTypes = {
  database: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default TableDataView;
