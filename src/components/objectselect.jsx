import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

let ObjectSelect = props => {
  let tables = [];

  // Split objects into lists based on type
  if(props.schema) {
    for(let [name, obj] of props.schema.entries()) {
      switch(obj.get('type')) {
        case 'table':
          tables.push(Object.assign({ name }, obj));
          break;
      }
    }
  }

  // Sort object lists
  tables.sort((a, b) => a.name.localeCompare(b.name));

  let clicked = objectName => {
    if(props.onSelect) { props.onSelect(objectName); }
  };

  return (<section className="objectSelect">
    <h2>Tables</h2>
    <ListGroup>
    {tables.map(table => (
      <ListGroupItem key={table.name} onClick={ () => { clicked(table.name) }}>
        { table.name }
      </ListGroupItem>
    ))}
    </ListGroup>
  </section>);
};

ObjectSelect.propTypes = {
  schema: ImmutablePropTypes.mapOf(ImmutablePropTypes.mapContains({
    type: React.PropTypes.string.isRequired,
    columns: ImmutablePropTypes.list,
  })),
  onSelect: React.PropTypes.func,
};

export default ObjectSelect;
