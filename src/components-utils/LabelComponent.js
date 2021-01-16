import React from 'react'
import { Col } from 'antd'

const LabelComponent = (props) => {
  const { value, style, span = 8, gutter = 0, classNameCustome } = props
  return (
    <Col span={span} gutter={gutter}>
      <div className={`LabelContainer ${classNameCustome ? classNameCustome : ''}`} style={style}>
        {value}
      </div>
    </Col>
  )
}

export default LabelComponent
