import React, { useState } from 'react'
import { Col } from 'antd'
import { Input } from 'antd'

const { TextArea } = Input

const InputComponents = (props) => {
  const { type, isValidate, data } = props
  const [username, setUsername] = useState(data)

  function setValue(e) {
    const { target } = e
    const { value } = target
    if (isValidate) {
      if (value.length > 10) {
        console.log('====max value')
        return
      }
      setUsername(value)
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
            value={username}
            autoComplete="off"
          />
        )
      case 'textarea': {
        const { placeholder = '' } = props
        return <TextArea style={style} placeholder={placeholder} autoSize />
      }
    }
    // return (
    //   <input
    //     className="InputContainer"
    //     type={type}
    //     name="name"
    //     min={min}
    //     max={max}
    //     isValidate={isValidate}
    //     style={style}
    //     onChange={(e) => setValue(e)}
    //     value={username}
    //     autoComplete="off"
    //   />
    // )
  }

  const returnInput = () => (
    <Col span={8}>
      <div className="ImputComponentsContainer">{siwtchComponent(type)}</div>
    </Col>
  )
  return returnInput()
}

export default InputComponents
