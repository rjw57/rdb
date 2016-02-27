import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TableView from './tableview.jsx';

let ObjectView = props => {
  if(!props.info) { return <div>no object</div>; }

  let type = props.info.get('type');
  switch(type) {
    case 'table':
    case 'view':
      return <TableView {...props} />
    default:
      return <div>Unknown type { type }</div>;
  }
};

ObjectView.propTypes = {
  readOnlyQuery: React.PropTypes.func.isRequired,
  info: ImmutablePropTypes.mapContains({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    sql: React.PropTypes.string.isRequired,
  }),
};

export default ObjectView;
