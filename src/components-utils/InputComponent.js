import React, { useState } from 'react'
import { Input } from 'antd'

const { TextArea } = Input

const InputComponents = (props) => {
  const { type, isValidate, data } = props
  const [dataInput, setDataInput] = useState(data)

  function setValue(e) {
    const { target } = e
    const { value } = target

    if (isValidate) {
      if (value.length > 10) {
        return
      }
      setDataInput(value)
    } else {
      setDataInput(value)
    }
  }

  const siwtchComponent = (type) => {
    const { min, max, isValidate, style } = props

    switch (type) {
      case 'text':
        return (
          <input
            className="InputContainer"
            type={type}
            name="name"
            min={min}
            max={max}
            isValidate={isValidate}
            style={style}
            onChange={(e) => setValue(e)}
            value={dataInput}
            autoComplete="off"
          />
        )
      case 'textarea': {
        const { placeholder = '' } = props
        return (
          <TextArea
            style={style}
            placeholder={placeholder}
            autoSize
            value={dataInput}
            onChange={(e) => setValue(e)}
          />
        )
      }
    }
  }

  return <div className="ImputComponentsContainer">{siwtchComponent(type)}</div>
}

export default InputComponents
