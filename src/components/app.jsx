import React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab, Button, Grid, Row, Col, Input } from 'react-bootstrap';

import ObjectSelect from './objectselect.jsx';
import ObjectView from './objectview.jsx';
import TableView from './tableview.jsx';
import AdHocQuery from './adhocquery.jsx';

import {
  selectObject, updateObjectInfo, openDatabaseFromArrayBuffer,
  reloadSchema
} from '../actions';

let IoPane = props => (
  <div>
    <Input label="Upload" type="file"
           onChange={e => props.onInput(e.target.files[0])} />
    <Button onClick={props.onSave}>Save</Button>
  </div>
);

let stateToProps = state => {
  let { database, objects, objectInfoByName, selectedObjectName } = state;
  return { database, objects, objectInfoByName, selectedObjectName };
};

let App = connect(stateToProps)(props => {
  let selectedObjectInfo = props.objectInfoByName.get(props.selectedObjectName);
  let readOnlyQuery = props.database ?
    (sql, params) => props.database.query(sql, params) : () => null;
  let query = (sql, params) => {
    if(!props.database) { return; }
    return readOnlyQuery(sql, params)
      .then(result => {
        props.dispatch(reloadSchema(props.database));
        return result;
      });
  };

  let save = () => {
    if(!props.database) { return; }
    props.database.export().then(buffer => {
      let blob = new Blob([buffer], {type: 'octet/stream'});
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'database.sqlite';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  let openFile = file => {
    let reader = new FileReader();
    reader.onload = () =>
      props.dispatch(openDatabaseFromArrayBuffer(reader.result));
    reader.readAsArrayBuffer(file);
  }

  let handleSelectObject = name => {
    props.dispatch(selectObject(name))
    if(!props.objectInfoByName.get(name)) {
      props.dispatch(updateObjectInfo(props.database, name));
    }
  };

  return (
    <Grid>
      <Tabs defaultActiveKey={1} animation={false}>
        <Tab eventKey={1} title="Schema">
          <Grid>
            <Row>
              <Col md={3}>
                <ObjectSelect
                  objects={props.objects} onSelect={handleSelectObject} />
              </Col>
              <Col md={9}>
                <ObjectView
                  readOnlyQuery={readOnlyQuery} info={selectedObjectInfo} />
              </Col>
            </Row>
          </Grid>
        </Tab>
        <Tab eventKey={2} title="Query">
          <h2>SQL</h2>
          <AdHocQuery query={query} />
        </Tab>
        <Tab eventKey={3} title="IO">
          <IoPane onSave={save} onInput={openFile} />
        </Tab>
      </Tabs>
    </Grid>
  );
});

export default App;
