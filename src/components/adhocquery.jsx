import React from 'react';
import { Alert, Table, Input, Button } from 'react-bootstrap';

class AdHocQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sql: props.initialSQL ? props.initialSQL : '',
      columns: [], values: [],
    };
  }

  render() {
    let { error, columns, values } = this.state;
    return (
      <div>
        { error ? <Alert bsStyle="danger">{ error }</Alert> : null }
        <Input type="textarea" value={this.state.sql}
               onChange={evt => this.setState({ sql: evt.target.value })} />
        <Button onClick={() => this.execute(this.state.sql)}>
          Execute
        </Button>
        <Table>
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
        </Table>
      </div>
    );
  }

  execute(sql) {
    this.setState({ error: null, columns: [], values: [] }, () => {
      this.props.query(sql)
        .then(result => this.setState(result))
        .catch(error => this.setState({ error: error.toString() }));
    });
  }
}

AdHocQuery.propTypes = {
  query: React.PropTypes.func.isRequired,
  initialSQL: React.PropTypes.string,
}

export default AdHocQuery;
