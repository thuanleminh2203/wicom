import React, { Fragment } from 'react'
import FormLogin from './FormLogin'
// import SampleComponent from '../../socket/socketDemo'
import SockJSClient from '../../socket'


const LoginComponent = () => {
  return (
    <Fragment>
      <div className="LoginContainer">
        <div className="LoginBackground"></div>
        <FormLogin />
      </div>
      {/* <SockJSClient /> */}
    </Fragment>
  )
}

export default LoginComponent
