import React from 'react'
import { Table } from 'react-bootstrap';

function queryData(query, name) {
  return query(`SELECT * FROM [${name}] LIMIT 100`);
}

class TableDataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    queryData(props.readOnlyQuery, props.name)
      .then(data => this.setState({ data }));
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
    // able name changed?
    if(nextProps.name !== this.props.name) {
      queryData(nextProps.readOnlyQuery, nextProps.name)
        .then(data => this.setState({ data }));
    }
  }
}

TableDataView.propTypes = {
  readOnlyQuery: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
};

export default TableDataView;
