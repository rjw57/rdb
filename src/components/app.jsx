import React from 'react'
import { connect } from 'react-redux'

function stateToProps(state) {
  return { }
}

function dispatchToProps(dispatch) {
  return {
    onNewDatabase() {
      console.log('hello')
    }
  }
}

export default connect(
  stateToProps, dispatchToProps
)((props) => {
  return <div><h1>Hello</h1></div>
})
