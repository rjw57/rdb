import React from 'react';
import { connect } from 'react-redux';

import { Tabs, Tab } from 'react-bootstrap';

import AdHocQuery from './adhocquery.jsx';
import IoPane from './iopane.jsx';
import SchemaBrowser from './schemabrowser.jsx';

import {
  setDatabaseFromFile, exportDatabase, queryMasterTable, selectObject
} from '../actions';

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
    <Tabs defaultActiveKey={1} animation={false}>
      <Tab eventKey={1} title="Schema">
        <SchemaBrowser
          readOnlyQuery={readOnlyQuery} objects={objectsByName}
          selectedObject={selectedObject}
          onSelectObjectName={name => dispatch(selectObject(name))}
        />
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
  );
});

export default App;
