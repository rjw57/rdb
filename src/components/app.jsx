import React from 'react'
import { connect } from 'react-redux'

import { Input, Button } from 'react-bootstrap'
import ObjectSelect from './objectselect.jsx'
import TableView from './tableview.jsx'

import { selectObject } from '../actions.js'

let stateToProps = state => {
  let { selectedObjectName, schema } = state;
  let selectedObjectType = null;
  let selectedObject = schema.get(selectedObjectName);
  if(selectedObject) {
    selectedObjectType = selectedObject.get('type');
    selectedObject = selectedObject.set('name', selectedObjectName);
  }
  return { schema, selectedObject, selectedObjectName, selectedObjectType };
};

let dispatchToProps = dispatch => ({
  onSelectObject(objectName) { dispatch(selectObject(objectName)); }
});

let App = connect(stateToProps, dispatchToProps)(props => (
  <div className="container">
    <h2>SQL</h2>
    <Input type="textarea" label="SQL"
           placeholder="SELECT * FROM sqlite_master" />
    <Button>Execute</Button>
    { props.selectedObjectType == 'table' ? (
      <TableView table={props.selectedObject.toJS()} />
    ) : null}
    <ObjectSelect objects={props.schema} onSelect={props.onSelectObject} />
  </div>
))

export default App;
