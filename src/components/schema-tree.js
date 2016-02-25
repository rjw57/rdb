import React from 'react'

let SchemaTree = props => (
  <section>
    <h1>Tables</h1>
    <ul>
      {
        props.schema.tables.map((row, idx) => (
          <li key={idx}>{ row.name }</li>
        ))
      }
    </ul>
  </section>
)

SchemaTree.propTypes = {
  schema: React.PropTypes.object.isRequired
}

export default SchemaTree
