import React, { useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import InputComponents from '../../components-utils/InputComponent'
import { ApiRequest } from '../../constant/apiUtils'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const FormLogin = () => {
  const [dataInput, setDataInput] = useState({ username: '', password: '', confirmPassword: '' })
  const { username, password, confirmPassword } = dataInput
  const [err, setErr] = useState({})
  const [isLogin, setIsLogin] = useState(true)
  const [isForget, setIsForget] = useState(false)
  const history = useHistory()
  // const location = useLocation()

  async function onSubmit() {
    if (!username.length) {
      setErr({ ...err, username: 'username không được để trống' })
      return
    }

    if (!password.length && isLogin) {
      setErr({ ...err, password: 'password không được để trống' })
      return
    }
    if (password !== confirmPassword && !isLogin) {
      setErr({ ...err, confirmPassword: 'password không giống nhau' })
      return
    }

    await ApiRequest.post('/authenticate', dataInput)
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        const { token = '' } = body
        localStorage.setItem('token', token)
        history.push('/home')
      })
      .catch((err) => {
        const { response = {} } = err
        const { data = {} } = response
        const { mess = '' } = data
        toast.error(mess)
      })
  }

  function onForget() {
    setIsForget(true)
  }
  function onLogin() {
    setIsForget(false)
    setIsLogin(!isLogin)
  }
  return (
    <div className="FormLoginContainer">
      <div className="ArrowBackHome">
        <Link to="/">
          <ArrowLeftOutlined style={{ fontSize: '21px', color: '#08c' }} />
        </Link>
      </div>

      {isForget ? (
        <p className="Title">Forget account</p>
      ) : (
        <p className="Title">{isLogin ? 'Login' : 'Register'}</p>
      )}
      <div className="FormLogin">
        <p>Username</p>
        <InputComponents
          placeholder="Enter your username"
          name="username"
          err={err}
          setErr={setErr}
          isValidate={true}
          value={username}
          dataInput={dataInput}
          setDataInput={setDataInput}
          min={1}
          max={50}
        />

        {!isForget && <p>Password</p>}
        {!isForget && (
          <InputComponents
            placeholder="Enter your password"
            type="password"
            name="password"
            err={err}
            setErr={setErr}
            isValidate={true}
            value={password}
            dataInput={dataInput}
            setDataInput={setDataInput}
            min={1}
            max={50}
          />
        )}

        {!isLogin && !isForget && <p>Confirm Password</p>}
        {!isLogin && !isForget && (
          <InputComponents
            placeholder="Confirm your password"
            type="password"
            name="confirmPassword"
            err={err}
            setErr={setErr}
            isValidate={true}
            value={confirmPassword}
            dataInput={dataInput}
            setDataInput={setDataInput}
            min={1}
            max={50}
          />
        )}

        <div
          className="ButtonLogin"
          onClick={Object.keys(err).length ? () => {} : () => onSubmit()}
        >
          <p>Submit</p>
        </div>
        <div className="ForgotContainer">
          <p onClick={() => onForget()}>Forget password?</p>
          <p onClick={() => onLogin()}>{isLogin ? 'Register account !!' : 'Login account !!'}</p>
        </div>
      </div>
    </div>
  )
}

export default FormLogin
