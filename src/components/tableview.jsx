import React from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap'

let TableView = props => {
  let { name, sql, columns } = props.table;

  return (<section className="tableView">
    <h3>{name}</h3>
    <Tabs defaultActiveKey={"cols"}>
      <Tab eventKey="cols" title="Columns">
        <Table>
          <thead>
            <tr><th>#</th><th>Name</th><th>Type</th></tr>
          </thead>
          <tbody>
          {columns.map(col => (
            <tr key={col.columnId}>
              <td>{col.columnId}</td>
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
    </Tabs>
  </section>);
}

TableView.propTypes = {
  table: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    sql: React.PropTypes.string.isRequired,
    columns: React.PropTypes.arrayOf(React.PropTypes.shape({
      columnId: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      type: React.PropTypes.string.isRequired,
      notNull: React.PropTypes.bool.isRequired,
      isPrimaryKey: React.PropTypes.bool.isRequired,
      defaultValue: React.PropTypes.object,
    })).isRequired,
  }),
}

export default TableView;
