import React from 'react'

export default {
  title: (props) => <h3 {...props.attributes}>{props.children}</h3>,
  paragraph: (props) =>
    <p {...props.attributes}>{props.children}</p>
}
