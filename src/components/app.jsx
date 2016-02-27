import React from 'react'
import { connect } from 'react-redux'

import { Grid, Row, Col, Input, Button } from 'react-bootstrap'
import ObjectSelect from './objectselect.jsx'
import TableView from './tableview.jsx'

import { selectObject } from '../actions.js'

let stateToProps = state => {
  let { database, objects } = state;
  return { database, objects };
};

let dispatchToProps = (dispatch, props) => ({
  onSelectObject(db, object) { dispatch(selectObject(db, object.get('name'))); }
});

let App = connect(stateToProps, dispatchToProps)(props => (
  <Grid>
    <Row>
      <Col md={3}>
        <ObjectSelect
            objects={props.objects}
            onSelect={key => props.onSelectObject(props.database,
                                                  props.objects.get(key))}
            />
      </Col>
      <Col md={9}>
      </Col>
    </Row>
  </Grid>
))

export default App;
