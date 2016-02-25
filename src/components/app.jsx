import React from 'react'
import { connect } from 'react-redux'

import TableList from './tablelist.jsx'

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
    <TableList masterTable={props.schema.masterTable} />
  </div>
))

export default App
