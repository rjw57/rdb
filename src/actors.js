import { queryObjectInfo } from './actions';

// Fetch object info for selected object if selected object does not yet have
// it.
function selectedObjectInfo(state, dispatch) {
  let { selectedObjectName, objectsByName, database } = state;
  let object = objectsByName.get(selectedObjectName);
  if(!object || !database) { return; }

  // If the selected object does not yet have the required info, kick off a
  // request.
  switch(object.get('type')) {
    case 'table':
    case 'view':
      if(!object.get('columns') &&
          !object.get('isQueryingColumns')) {
        dispatch(queryObjectInfo(database, selectedObjectName));
      }
      break;
  }
}

let actors = [
  selectedObjectInfo
];

export default actors;
