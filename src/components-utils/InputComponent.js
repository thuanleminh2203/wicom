import React from 'react'
import { Input, Col } from 'antd'

const { TextArea } = Input

const InputComponents = (props) => {
  const {
    type = 'text',
    isValidate,
    name,
    span = 16,
    gutter = 0,
    regex,
    minValue,
    maxValue,
    isNumber = false,
    sendMessageSocket,
    disabled,
  } = props
  const { min, max, style } = props
  const { setDataInput, dataInput, err, value: valueProps, placeholder = '' } = props
  // console.log('===disabled===', valueProps)

  // function onEnterTextArea(e) {
  //   console.log('====event====', e)
  // }

  function setValue(e) {
    const { target } = e
    let { value } = target

    value = value.replace(/\r?\n/g, '')

    if (isValidate) {
      if (value.length < min || value.length > max) {
        // setErr({ ...err, [name]: `${name} phải lớn hơn ${min} và bé hơn ${max}` })
        if (value.length === 0) setDataInput({ ...dataInput, [name]: value })
        return
      }
      if (isNumber) {
        // console.log('===regex==', regex.test(value), value)
        // /^\d{3}$/
        if (value === '') setDataInput({ ...dataInput, [name]: value })

        if (regex && !regex.test(value)) return

        if (parseInt(value) < minValue || parseInt(value) > maxValue) return
      }
    }
    // setErr({})
    setDataInput({ ...dataInput, [name]: value })
  }

  const siwtchComponent = () => {
    switch (type) {
      case 'text':
        return (
          <>
            <input
              className={`InputContainer ${err[name] && 'InputErr'}`}
              // type={type}
              name={name}
              min={min}
              max={max}
              isValidate={isValidate}
              style={style}
              onChange={(e) => setValue(e)}
              value={valueProps}
              autoComplete="off"
              placeholder={placeholder}
              disabled={disabled}
            />
            {err[name] && <span className="ValidateInput">{err[name]}</span>}
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
            value={valueProps}
            name={name}
            onPressEnter={() => sendMessageSocket()}
            isValidate={true}
          />
        )
      }

      // case 'textarea': {
      //   const { placeholder = '' } = props
      //   return (
      //     <tex
      //       style={style}
      //       placeholder={placeholder}
      //       autoSize
      //       onChange={(e) => setValue(e)}
      //       value={valueProps}
      //       name={name}
      //       onPressEnter={() => sendMessageSocket()}
      //     />
      //   )
      // }

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
              value={valueProps}
              autoComplete="off"
              placeholder={placeholder}
              disabled={disabled}
            />
            {err[name] && <p className="ValidateInput">{err[name]}</p>}
          </>
        )
      }
    }
  }

  return (
    <Col span={span} gutter={gutter}>
      <div className="ImputComponentsContainer">{siwtchComponent()}</div>
    </Col>
  )
}

export default InputComponents
