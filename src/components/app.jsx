import React from 'react';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';

import ObjectSelect from './objectselect.jsx';
import ObjectView from './objectview.jsx';
import TableView from './tableview.jsx';
import AdHocQuery from './adhocquery.jsx';

import { selectObject, updateObjectInfo } from '../actions.js'

let stateToProps = state => {
  let { database, objects, objectInfoByName, selectedObjectName } = state;
  return { database, objects, objectInfoByName, selectedObjectName };
};

let App = connect(stateToProps)(props => {
  let selectedObjectInfo = props.objectInfoByName.get(props.selectedObjectName);
  let readOnlyQuery = props.database ?
    (sql, params) => props.database.query(sql, params) : () => null;

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
          <h2>SQL</h2>
          <AdHocQuery query={readOnlyQuery} />
          <ObjectView readOnlyQuery={readOnlyQuery}
                      info={selectedObjectInfo} />
        </Col>
      </Row>
    </Grid>
  );
});

export default App;
