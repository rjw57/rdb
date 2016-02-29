import React from 'react';
import { Button, Input } from 'react-bootstrap';

const IoPane = props => (
  <div>
    <Input label="Upload" type="file"
           onChange={e => props.onInput(e.target.files[0])} />
    <Button onClick={props.onSave}>Save</Button>
  </div>
);

export default IoPane;

