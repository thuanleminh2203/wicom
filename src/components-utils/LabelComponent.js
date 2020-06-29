import React from 'react'
// import { Col } from 'antd'
const LabelComponent = (props) => {
  const { value, style } = props
  return (
    // <Col span={4} gutter={8}>
    <div className="LabelContainer" style={style}>
      {value}
    </div>
    // </Col>
  )
}

export default LabelComponent
