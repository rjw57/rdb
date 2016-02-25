import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

let TableList = props => {
  let clickTable = tablename => {
    if(props.onClick) { props.onClick(table) }
  }

  return (
    <ListGroup>
    {
      props.masterTable
        .filter(row => row.type == 'table')
        .map((row, idx) => (
          <ListGroupItem key={idx} onClick={ () => clickTable(row.name) }>
            { row.name }
          </ListGroupItem>
        ))
    }
    </ListGroup>
  );
}

TableList.propTypes = {
  masterTable: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  })).isRequired,
  onClick: React.PropTypes.function,
}

export default TableList
