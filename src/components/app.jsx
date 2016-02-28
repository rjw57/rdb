import React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab, Button, Grid, Row, Col, Input } from 'react-bootstrap';

import ObjectSelect from './objectselect.jsx';
import ObjectView from './objectview.jsx';
import AdHocQuery from './adhocquery.jsx';

import {
  setDatabaseFromFile,
  exportDatabase,
  queryMasterTable,
  selectObject
} from '../actions';

let IoPane = props => (
  <div>
    <Input label="Upload" type="file"
           onChange={e => props.onInput(e.target.files[0])} />
    <Button onClick={props.onSave}>Save</Button>
  </div>
);

let stateToProps = state => {
  let { database, objectsByName, selectedObjectName } = state;
  let selectedObject = objectsByName.get(selectedObjectName);
  return { database, objectsByName, selectedObject };
};

let App = connect(stateToProps)(props => {
  let { database, dispatch, selectedObject, objectsByName } = props;

  function readOnlyQuery(sql, params) {
    return database.query(sql, params);
  }

  function query(sql, params) {
    return readOnlyQuery(sql, params)
      .then(result => {
        props.dispatch(queryMasterTable(props.database));
        return result;
      });
  }

  return (
    <Grid>
      <Tabs defaultActiveKey={1} animation={false}>
        <Tab eventKey={1} title="Schema">
          <Grid>
            <Row>
              <Col md={3}>
                <ObjectSelect
                  objects={props.objectsByName}
                  onSelect={name => dispatch(selectObject(name))} />
              </Col>
              <Col md={9}>
                <ObjectView
                  readOnlyQuery={readOnlyQuery} info={selectedObject} />
              </Col>
            </Row>
          </Grid>
        </Tab>
        <Tab eventKey={2} title="Query">
          <h2>SQL</h2>
          <AdHocQuery query={query} />
        </Tab>
        <Tab eventKey={3} title="IO">
          <IoPane
            onSave={() => dispatch(exportDatabase(database))}
            onInput={file => dispatch(setDatabaseFromFile(file))}
          />
        </Tab>
      </Tabs>
    </Grid>
  );
});

export default App;
