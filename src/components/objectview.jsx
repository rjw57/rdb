import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TableView from './tableview.jsx';

let ObjectView = props => {
  if(!props.database) { return <div>no database</div>; }
  if(!props.info) { return <div>no object</div>; }

  let type = props.info.get('type');
  switch(type) {
    case 'table':
      return <TableView {...props} />
    default:
      return <div>Unknown type { type }</div>;
  }
};

ObjectView.propTypes = {
  database: React.PropTypes.object,
  info: ImmutablePropTypes.mapContains({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    sql: React.PropTypes.string.isRequired,
  }),
};

export default ObjectView;
