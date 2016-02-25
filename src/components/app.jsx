import React from 'react'
import { connect } from 'react-redux'

import SchemaTree from './schema-tree.js'

function stateToProps(state) {
  let { schema } = state
  return { schema }
}

function dispatchToProps(dispatch) {
  return {
    onNewDatabase() {
      console.log('hello')
    }
  }
}

let App = connect(
  stateToProps, dispatchToProps
)(props => (
  <div>
    <SchemaTree schema={props.schema} />
  </div>
))

export default App
