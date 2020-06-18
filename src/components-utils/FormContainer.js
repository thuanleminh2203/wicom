import React from 'react'
import { Row } from 'antd'
const FormContainer = (props) => {
  const { style } = props
  return (
    <div className="FormContainer" style={style}>
      <Row>{props.children}</Row>
    </div>
  )
}

export default FormContainer
