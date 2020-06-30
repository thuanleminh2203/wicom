import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

const InputComponents = (props) => {
  const { type, isValidate, data, name } = props
  const { setDataInput1, dataInput1 } = props
  // const [dataInput, setDataInput] = useState(data)

  //demo text area
  function setValue(e) {
    const { target } = e
    const { value, name } = target

    if (isValidate) {
      if (value.length > 10) {
        return
      }
      setDataInput1({ ...data, [name]: value })
    } else {
      setDataInput1(value)
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
            name={name}
            min={min}
            max={max}
            isValidate={isValidate}
            style={style}
            onChange={(e) => setDataInput1(e)}
            value={dataInput1}
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
            value={setDataInput1}
            onChange={(e) => setValue(e)}
          />
        )
      }
    }
  }

  return <div className="ImputComponentsContainer">{siwtchComponent(type)}</div>
}

export default InputComponents
