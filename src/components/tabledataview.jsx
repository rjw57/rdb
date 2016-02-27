import React from 'react'
import { Table } from 'react-bootstrap';

function queryData(database, name) {
  return database._db.exec(
    `SELECT * FROM [${name}] LIMIT 100`
  )[0];
}

class TableDataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: queryData(props.database, props.name) };
  }

  render() {
    if(!this.state.data) { return <div>No data</div>; }
    let { columns, values } = this.state.data;
    return (<Table>
      <thead>
        <tr>
          {columns.map((s, idx) => (<th key={idx}>{s}</th>))}
        </tr>
      </thead>
      <tbody>
        {values.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((val, valIdx) => (<td key={valIdx}>{val}</td>))}
          </tr>
        ))}
      </tbody>
    </Table>);
  }

  componentWillReceiveProps(nextProps) {
    // database or table name changed?
    if((nextProps.database !== this.props.database) ||
        (nextProps.name !== this.props.name)) {
      this.setState({
        data: queryData(nextProps.database, nextProps.name)
      });
    }
  }
}

TableDataView.propTypes = {
  database: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default TableDataView;
