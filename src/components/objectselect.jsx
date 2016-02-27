import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

let ObjectList = props => (
  <ListGroup>
  {props.objects.map(object => (
    <ListGroupItem key={object.name}
                   onClick={() => props.onClick(object.name)}>
      {object.name}
    </ListGroupItem>
  ))}
  </ListGroup>
);

let ObjectSelect = props => {
  let tables = [], views = [];

  // Split objects into lists based on type
  if(props.objects) {
    props.objects.forEach(obj => {
      switch(obj.get('type')) {
        case 'table':
          tables.push(obj.toJS());
          break;
        case 'view':
          views.push(obj.toJS());
          break;
      }
    });
  }

  // Sort object lists
  tables.sort((a, b) => a.name.localeCompare(b.name));
  views.sort((a, b) => a.name.localeCompare(b.name));

  let clicked = objectName => {
    if(props.onSelect) { props.onSelect(objectName); }
  };

  return (<section className="objectSelect">
    <h2>Tables</h2>
    <ObjectList objects={tables} onClick={name => clicked(name)} />
    <h2>Views</h2>
    <ObjectList objects={views} onClick={name => clicked(name)} />
  </section>);
};

ObjectSelect.propTypes = {
  objects: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  })),
  onSelect: React.PropTypes.func,
};

export default ObjectSelect;
