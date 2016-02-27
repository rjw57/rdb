import React from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap'
import ImmutablePropTypes from 'react-immutable-proptypes';

import TableDataView from './tabledataview.jsx';

let TableView = props => {
  let { name, sql, columns } = props.info.toJS();

  return (<section className="tableView">
    <h2>{name}</h2>
    <Tabs defaultActiveKey={"cols"}>
      <Tab eventKey="cols" title="Columns">
        <Table>
          <thead>
            <tr><th>#</th><th>Name</th><th>Type</th></tr>
          </thead>
          <tbody>
          {columns.map(col => (
            <tr key={col.cid}>
              <td>{col.cid}</td>
              <td>{col.name}</td>
              <td>{col.type}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey="sql" title="SQL">
        <pre><code>{sql}</code></pre>
      </Tab>
      <Tab eventKey="data" title="Data">
        <TableDataView name={name} database={props.database} />
      </Tab>
    </Tabs>
  </section>);
};

TableView.propTypes = {
  database: React.PropTypes.object.isRequired,
  info: ImmutablePropTypes.mapContains({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    sql: React.PropTypes.string.isRequired,
    columns: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      cid: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      notnull: React.PropTypes.number.isRequired,
      pk: React.PropTypes.number.isRequired,
      dflt_value: React.PropTypes.object,
    })).isRequired,
  }),
}

export default TableView;
