import React from 'react'
import { connect } from 'react-redux'

import { Grid, Row, Col, Input, Button } from 'react-bootstrap'
import ObjectSelect from './objectselect.jsx'
import ObjectView from './objectview.jsx'
import TableView from './tableview.jsx'

import { selectObject, updateObjectInfo } from '../actions.js'

let stateToProps = state => {
  let { database, objects, objectInfoByName, selectedObjectName } = state;
  return { database, objects, objectInfoByName, selectedObjectName };
};

let App = connect(stateToProps)(props => {
  let selectedObjectInfo = props.objectInfoByName.get(props.selectedObjectName);

  return (
    <Grid>
      <Row>
        <Col md={3}>
          <ObjectSelect
            objects={props.objects}
            onSelect={name => {
              props.dispatch(selectObject(name))
              if(!props.objectInfoByName.get(name)) {
                props.dispatch(updateObjectInfo(props.database, name));
              }
            }}
          />
        </Col>
        <Col md={9}>
          <ObjectView database={props.database} info={selectedObjectInfo} />
        </Col>
      </Row>
    </Grid>
  );
});

export default App;
