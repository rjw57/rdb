import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Grid, Row, Col } from 'react-bootstrap';

import ObjectSelect from './objectselect.jsx';
import ObjectView from './objectview.jsx';

const SchemaBrowser = props => {
  let { objects, selectedObject, readOnlyQuery, onSelectObjectName } = props;
  return (
    <Grid>
      <Row>
        <Col md={3}>
          <ObjectSelect objects={objects} onSelect={onSelectObjectName} />
        </Col>
        <Col md={9}>
          <ObjectView readOnlyQuery={readOnlyQuery} object={selectedObject} />
        </Col>
      </Row>
    </Grid>
  );
}

SchemaBrowser.propTypes = {
  readOnlyQuery: React.PropTypes.func.isRequired,
  selectedObject: ImmutablePropTypes.map,
  objects: ImmutablePropTypes.mapOf(ImmutablePropTypes.map),
  onSelectObjectName: React.PropTypes.func,
}

export default SchemaBrowser;
