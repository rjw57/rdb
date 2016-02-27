import React from 'react'
import { connect } from 'react-redux'

import { Grid, Row, Col, Input, Button } from 'react-bootstrap'
import ObjectSelect from './objectselect.jsx'
import TableView from './tableview.jsx'

import { selectObject } from '../actions.js'

let stateToProps = state => {
  let { selectedObjectName, database } = state;

  let schema = database ? database.fetchSchema() : null;
  let selectedObject = schema ? schema.get(selectedObjectName) : null;
  let selectedObjectType = null;
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
  <Grid>
    <Row>
      <Col md={4}>
        <ObjectSelect schema={props.schema} onSelect={props.onSelectObject} />
      </Col>
      <Col md={8}>
        { props.selectedObjectType == 'table' ? (
          <TableView table={props.selectedObject.toJS()} />
        ) : null}
      </Col>
    </Row>
  </Grid>
))

export default App;
