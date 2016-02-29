import React from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap'
import ImmutablePropTypes from 'react-immutable-proptypes';

function renderColumnTable(columns) {
  let { isQuerying, columnList } = columns;
  if(!columnList && isQuerying) {
    return <div>Querying&hellip;</div>;
  } else if(!columnList) {
    return <div>No columns</div>;
  }

  return (
    <Table>
      <thead>
        <tr><th>#</th><th>Name</th><th>Type</th></tr>
      </thead>
      <tbody>
      {columnList.map(col => (
        <tr key={col.cid}>
          <td>{col.cid}</td>
          <td>{col.name}</td>
          <td>{col.type}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

class TableView extends React.Component {
  render() {
    let { object } = this.props;
    if(!object) { return <div />; }

    let { name, sql, columns } = object.toJS();

    return (<section className="tableView">
      <h2>{name}</h2>
      <Tabs defaultActiveKey={"cols"}>
        <Tab eventKey="cols" title="Columns">
          {renderColumnTable(columns)}
        </Tab>
        <Tab eventKey="sql" title="SQL">
          <pre><code>{sql}</code></pre>
        </Tab>
        <Tab eventKey="data" title="Data">
          <div>todo</div>
        </Tab>
      </Tabs>
    </section>);
  }
}

TableView.propTypes = {
  object: ImmutablePropTypes.mapContains({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    sql: React.PropTypes.string.isRequired,
    columns: ImmutablePropTypes.mapContains({
      isQuerying: React.PropTypes.bool,
      columnList: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
        cid: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        notnull: React.PropTypes.number.isRequired,
        pk: React.PropTypes.number.isRequired,
        dflt_value: React.PropTypes.object,
      })),
    }),
  }),
}

export default TableView;
