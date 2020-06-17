import React from 'react'

const LabelComponent = (props) => {
  const { value, style } = props
  return (
    <div className="LabelContainer" style={style}>
      {value}
    </div>
  )
}

export default LabelComponent
