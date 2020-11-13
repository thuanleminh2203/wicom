import React from 'react'
import { Row } from 'antd'
const FormContainer = (props) => {
  const { style, classNameCustome, justify } = props
  console.log("justify",justify)
  return (
    <div className={`FormContainer ${classNameCustome ? classNameCustome : ""} `} style={style}>
      <Row justify={justify}>{props.children}</Row>
    </div>
  )
}

export default FormContainer
