import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TableView from './tableview.jsx';

let ObjectView = props => {
  let { object } = props;
  if(!object) { return <div>no object</div>; }

  switch(object.get('type')) {
    case 'table':
    case 'view':
      return <TableView {...props} />
    default:
      return <div>Unknown type { type }</div>;
  }
};

ObjectView.propTypes = {
  object: ImmutablePropTypes.contains({
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    sql: React.PropTypes.string.isRequired,
  }),
};

export default ObjectView;
