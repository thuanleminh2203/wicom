import React, { Fragment } from 'react'
import FormLogin from './FormLogin'

const LoginComponent = () => {
  return (
    <Fragment>
      <div className="LoginContainer">
        <div className="LoginBackground"></div>
        <FormLogin />
      </div>
    </Fragment>
  )
}

export default LoginComponent
