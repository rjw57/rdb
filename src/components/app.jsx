import React from 'react'
import { connect } from 'react-redux'

function stateToProps(state) {
  return {
    isDatabaseLoaded: state.isDatabaseLoaded,
  }
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
  if(!props.isDatabaseLoaded) {
    return <div><input type="file" onChange={props.onNewDatabase}/></div>
  }

  return <div><h1>Loaded</h1></div>
})
