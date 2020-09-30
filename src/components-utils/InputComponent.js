import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

const InputComponents = (props) => {
  const { type, isValidate, name } = props
  const { min, max, style } = props
  const { setDataInput, dataInput, value, err, setErr, placeholder = '' } = props
  console.log('=======im here====', name)

  function setValue(e) {
    const { target } = e
    const { value } = target
    console.log('repassword', name, value.length)
    if (isValidate) {
      if (value.length < min || value.length > max) {
        setErr({ ...err, [name]: `${name} phải lớn hơn ${min} và bé hơn ${max}` })
        if (value.length === 0) setDataInput({ ...dataInput, [name]: value })
        return
      }
    }
    setErr({})
    setDataInput({ ...dataInput, [name]: value })
  }

  const siwtchComponent = () => {
    switch (type) {
      case 'text':
        return (
          <>
            <input
              className={`InputContainer ${err[name] && 'InputErr'}`}
              type={type}
              name={name}
              min={min}
              max={max}
              isValidate={isValidate}
              style={style}
              onChange={(e) => setValue(e)}
              value={value}
              autoComplete="off"
              placeholder={placeholder}
            />
            {/* { err[name] && <p className="ValidateInput">{err[name]}</p>} */}
          </>
        )
      case 'textarea': {
        const { placeholder = '' } = props
        return (
          <TextArea
            style={style}
            placeholder={placeholder}
            autoSize
            onChange={(e) => setValue(e)}
          />
        )
      }

      default: {
        return (
          <>
            <input
              className={`InputContainer ${err[name] && 'InputErr'}`}
              type={type}
              name={name}
              min={min}
              max={max}
              isValidate={isValidate}
              style={style}
              onChange={(e) => setValue(e)}
              value={value}
              autoComplete="off"
            />
            {err[name] && <p className="ValidateInput">{err[name]}</p>}
          </>
        )
      }
    }
  }

  return <div className="ImputComponentsContainer">{siwtchComponent()}</div>
}

export default InputComponents
