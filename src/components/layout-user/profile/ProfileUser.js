import React, { useEffect, useState } from 'react'
import { Avatar, Col, Upload, Button } from 'antd'
import InputComponents from '../../../components-utils/InputComponent'
import LabelComponent from '../../../components-utils/LabelComponent'
import FormContainer from '../../../components-utils/FormContainer'
import { ApiRequest } from '../../../constant/apiUtils'
import { toast } from 'react-toastify'
import * as Constant from './../../../constant/Constant'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const src = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
const data = (valueProps) => [
  {
    id: 1,
    label: 'Username',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: 'thuanlm',
    name: 'username',
    value: valueProps.username,
  },
  {
    id: 3,
    label: 'Fullname',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: 'Le Minh Thuan',
    name: 'Fullname',
    value: valueProps.fullName,
  },
  {
    id: 4,
    label: 'Khóa',
    type: 'number',
    min: 0,
    max: 10,
    isValidate: true,
    data: 60,
    name: 'khoa',
    value: valueProps.khoa,
  },
  {
    id: 5,
    label: 'Ngày sinh',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: '22-03-1997',
    name: 'birthday',
    value: valueProps.birthday,
  },
  {
    id: 6,
    label: 'Số điện thoại',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: '0981352703',
    value: valueProps.phoneNumber,
    name: 'phoneNumber',
  },
]

const ProfileUser = () => {
  const [err, setErr] = useState({})
  const [dataApi, setDataApi] = useState({})
  const { avatarUrl } = dataApi
  const [avatar, setAvatar] = useState(avatarUrl)
  // const [file, setFile] = useState(null)
  // const [avatarChange, setAvatarChange] = useState(null)
  useEffect(() => {
    setAvatar(avatarUrl)
  }, [avatarUrl])
  useEffect(() => {
    getInfor()
  }, [])

  async function getInfor() {
    await ApiRequest.get(Constant.API_USER_DETAIL)
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        setDataApi(body)
      })
      .catch((err) => {
        const { response = {} } = err
        const { data = {} } = response
        const { mess = '' } = data
        toast.error(mess)
      })
  }
  const handleUpload = async ({ fileList }) => {
    let url = null
    // if (file) {
    const formData = new FormData()
    // var imagefile = document.querySelector('#file')
    formData.append('files', fileList[0].originFileObj)
    await axios
      .post('http://localhost:8080/api/v1/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        url = body
      })
      .catch((err) => console.log('=====err===', err))
    // }

    await axios
      .put('http://localhost:8080/api/v1/user/my-info', {
        avatar: url,
      })
      .then((res) => {
        setAvatar(url)
        // const { data = {} } = res
        // const { data: body = {} } = data
      })
      .catch((err) => console.log('===er===', err))
  }
  console.log('====avatar===', avatarUrl)

  return (
    <div className="ProfileUserContainer">
      {avatar ? (
        <>
          <div className="AvatarContainer">
            <Avatar src={avatar} size={150} />
          </div>
          <p className="TextName">Doãn Chí Bình</p>
        </>
      ) : (
        <div className="AvatarContainer">
          <Avatar
            src={src}
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          />
        </div>
      )}
      <div className="ButtonUploadContainer">
        <Upload
          beforeUpload={() => false}
          onChange={handleUpload}
          action={() => {}}
          multiple={false}
        >
          <Button icon={<UploadOutlined />}>Cập nhật avatar</Button>
        </Upload>
      </div>

      <div className="InforContainer">
        <h2>Thông tin cá nhân</h2>
        <div className="InforDetailContainer">
          {data(dataApi).map((value) => (
            <FormContainer key={value.id} style={{ marginTop: '10px' }} justify="center">
              <LabelComponent value={value.label} classNameCustome="LabelInforContainer" />
              <Col span={16}>
                <InputComponents
                  type={value.type}
                  isValidate={value.isValidate}
                  data={value.data}
                  err={err}
                  setErr={setErr}
                  name={value.name}
                  disabled={true}
                  value={value.value}
                />
              </Col>
            </FormContainer>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
