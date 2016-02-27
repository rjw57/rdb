import React from 'react'
import { connect } from 'react-redux'

import { Grid, Row, Col, Input, Button } from 'react-bootstrap'
import ObjectSelect from './objectselect.jsx'
import TableView from './tableview.jsx'

import { selectObject } from '../actions.js'

let stateToProps = state => {
  let { objects } = state;
  return { objects };
};

let dispatchToProps = dispatch => ({
  onSelectObject(objectName) { dispatch(selectObject(objectName)); }
});

let App = connect(stateToProps, dispatchToProps)(props => (
  <Grid>
    <Row>
      <Col md={3}>
        <ObjectSelect objects={props.objects}
                      onSelect={props.onSelectObject} />
      </Col>
      <Col md={9}>
      </Col>
    </Row>
  </Grid>
))

export default App;
