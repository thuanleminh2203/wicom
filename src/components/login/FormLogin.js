import React from 'react'
import { Input } from 'antd'
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const FormLogin = () => {
  return (
    <div className="FormLoginContainer">
      <div className="ArrowBackHome">
        <Link to="/">
          <ArrowLeftOutlined style={{ fontSize: '21px', color: '#08c' }} />
        </Link>
      </div>
      <p className="Title">Login</p>
      <div className="FormLogin">
        <p>Username</p>
        <Input placeholder="Enter your username" prefix={<UserOutlined />} />
        <p>Password</p>
        <Input.Password placeholder="Enter your password" prefix={<LockOutlined />} />
        <div className="ButtonLogin">
          <p>Submit</p>
        </div>
        <div className="ForgotContainer">
          <p>Forgot password?</p>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
