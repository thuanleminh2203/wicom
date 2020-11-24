import React, { useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import InputComponents from '../../components-utils/InputComponent'
import { ApiRequest } from '../../constant/apiUtils'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import FormContainer from '../../components-utils/FormContainer'
import LabelComponent from '../../components-utils/LabelComponent'
import { Col, DatePicker } from 'antd'
import moment from 'moment'
import * as Constant from './../../constant/Constant'

const initData = {
  username: '',
  password: '',
  confirmPassword: '',
  khoa: '',
  fullname: '',
  birthday: '',
  phoneNumber: '',
  email: '',
}
const STATUS_LOGIN = 1
const STATUS_REGISTER = 2
const STATUS_FORGET = 3
// const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const REGEX_PHONENUMBER = /^[0-9]{10}$/
const FormLogin = () => {
  const [dataInput, setDataInput] = useState(initData)
  const { username, password, confirmPassword, khoa, fullname, birthday, phoneNumber } = dataInput
  const [err, setErr] = useState({})
  const [isLogin, setIsLogin] = useState(true)
  const [isForget, setIsForget] = useState(false)
  const history = useHistory()
  // const location = useLocation()

  async function onSubmit() {
    let status = STATUS_LOGIN
    const error = {}
    if (!isLogin && !isForget) status = STATUS_REGISTER

    if (isForget) status = STATUS_FORGET

    if (!username) {
      error.username = 'Không được để trống trường này !!'
    } else {
      if (!Constant.REGEX_EMAIL.test(username)) {
        error.username = 'Email không đúng định dạng !!'
      }
    }

    if (status !== STATUS_FORGET) {
      //email

      // }else{
      //password
      if (!password) {
        error.password = 'Không được để trống trường này !!'
      } else {
        if (password.length < 8) {
          error.password = 'Mật khẩu phải có ít nhất 8 kí tự'
        }
      }

      if (status == STATUS_REGISTER) {
        //confirmPassword
        if (!confirmPassword) {
          error.confirmPassword = 'Không được để trống trường này !!'
        } else {
          if (confirmPassword !== password) {
            error.confirmPassword = 'Mật khẩu không khớp !!'
          }
        }
        //khoa
        if (!khoa) {
          error.khoa = 'Không được để trống trường này !!'
        } else {
          if (parseInt(khoa) > parseInt(moment().format('YYYY')) - 1955) {
            error.khoa = 'Vui lòng kiểm tra lại khóa học !!'
          }
        }
        //fullname
        if (!fullname) {
          error.fullname = 'Không được để trống trường này !!'
        }

        //phoneNumber
        if (!phoneNumber) {
          error.phoneNumber = 'Không được để trống trường này !!'
        } else {
          if (!REGEX_PHONENUMBER.test(phoneNumber))
            error.phoneNumber = 'Số điện thoại không đúng định dạng !!'
        }
        //birthday
        if (!birthday) error.birthday = 'Không được để trống trường này !!'
      }
    }
    setErr(error)
    console.log('====err=== submit===', Object.keys(error))
    if (Object.keys(error).length) return

    console.log('=====status====', status)
    status === STATUS_LOGIN
      ? await apiLogin()
      : status === STATUS_REGISTER
      ? await apiRegister()
      : await apiResetPwd()
  }

  async function apiLogin() {
    await ApiRequest.post(Constant.API_AUTHENTICATE, { username, password })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        const { token = '', roles = [], username = '', fullName = '', id = '' } = body

        localStorage.setItem('token', token)
        localStorage.setItem('roles', roles)
        localStorage.setItem('username', username)
        localStorage.setItem('fullName', fullName)
        localStorage.setItem('id', id)

        history.push('/home')
        window.location.reload()
      })
      .catch((err) => {
        console.log('===err===', err)
        const { response = {} } = err
        const { data = {} } = response
        const { mess = '' } = data
        toast.error(mess)
      })
  }

  async function apiRegister() {
    await ApiRequest.post(Constant.API_USER, dataInput)
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        // const { token = '' } = body
      })
      .catch((err) => {
        const { response = {} } = err
        const { data = {} } = response
        const { mess = '' } = data
        toast.error(mess)
      })
  }

  async function apiResetPwd() {
    await ApiRequest.post('/reset-password', { username })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        // const { token = '' } = body
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
    setErr({})
  }
  function onLogin() {
    setIsForget(false)
    setIsLogin(!isLogin)
    setErr({})
  }
  function onChange(date) {
    setDataInput({ ...dataInput, birthday: date })
    console.log('============', moment(date).format('DD-MM-YYYY'))
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
      <div className={`FormLogin ${Object.keys(err).length && 'ValidateInputContainer'}`}>
        <FormContainer justify="space-around">
          <LabelComponent value="Tài khoản" />
          <InputComponents
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
        </FormContainer>

        {!isForget && (
          <FormContainer justify="space-around">
            <LabelComponent value="Mật khẩu" />
            <InputComponents
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
          </FormContainer>
        )}

        {!isLogin && !isForget && (
          <FormContainer justify="space-around">
            <LabelComponent value="Nhập lại mật khẩu" />
            <InputComponents
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
          </FormContainer>
        )}

        {!isLogin && !isForget && (
          <FormContainer justify="space-around">
            <LabelComponent value="Họ tên" />
            <InputComponents
              type="text"
              name="fullname"
              err={err}
              setErr={setErr}
              isValidate={true}
              value={fullname}
              dataInput={dataInput}
              setDataInput={setDataInput}
              min={1}
              max={50}
            />
          </FormContainer>
        )}

        {!isLogin && !isForget && (
          <FormContainer justify="space-around">
            <LabelComponent value="Khóa" />
            <InputComponents
              type="text"
              name="khoa"
              err={err}
              setErr={setErr}
              isValidate={true}
              dataInput={dataInput}
              setDataInput={setDataInput}
              value={khoa}
              min={1}
              max={50}
            />
          </FormContainer>
        )}

        {!isLogin && !isForget && (
          <FormContainer justify="space-around">
            <LabelComponent value="Số điện thoại" />
            <InputComponents
              type="text"
              name="phoneNumber"
              err={err}
              setErr={setErr}
              isValidate={true}
              value={phoneNumber}
              dataInput={dataInput}
              setDataInput={setDataInput}
              min={1}
              max={50}
            />
          </FormContainer>
        )}

        {!isLogin && !isForget && (
          <FormContainer justify="space-around">
            <LabelComponent value="Sinh nhật" />
            <Col span={16} gutter={0} className={`${err.birthday && 'ValidateDate'}`}>
              <DatePicker onChange={onChange} format="DD-MM-YYYY" placeholder="" value={birthday} />
              {err.birthday && <span className="ValidateInput">{err.birthday}</span>}
            </Col>
          </FormContainer>
        )}

        <div className="ButtonLogin" onClick={onSubmit}>
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
