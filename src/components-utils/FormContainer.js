import React from 'react'

const FormContainer = (props) => {
  const { style } = props
  return (
    <div className="FormContainer" style={style}>
      {props.children}
    </div>
  )
}

export default FormContainer
