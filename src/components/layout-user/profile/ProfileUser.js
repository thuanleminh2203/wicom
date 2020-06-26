import React from 'react'
import { Avatar, Col } from 'antd'
import InputComponents from '../../../components-utils/InputComponent'
import LabelComponent from '../../../components-utils/LabelComponent'
import FormContainer from '../../../components-utils/FormContainer'

const src = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
const data = [
  { id: 1, label: 'Username', type: 'text', min: 0, max: 10, isValidate: true, data: 'thuanlm' },
  {
    id: 2,
    label: 'Password',
    type: 'password',
    min: 0,
    max: 10,
    isValidate: true,
    data: '123456789',
  },
  {
    id: 3,
    label: 'Fullname',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: 'Le Minh Thuan',
  },
  {
    id: 4,
    label: 'Khóa',
    type: 'number',
    min: 0,
    max: 10,
    isValidate: true,
    data: 60,
  },
  {
    id: 5,
    label: 'Ngày sinh',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: '22-03-1997',
  },
  {
    id: 6,
    label: 'Số điện thoại',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: '0981352703',
  },
  {
    id: 7,
    label: 'Team',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: 'FPGA',
  },
  {
    id: 8,
    label: 'Project',
    type: 'text',
    min: 0,
    max: 10,
    isValidate: true,
    data: 'Sonar',
  },
]
const ProfileUser = () => {
  return (
    <div className="ProfileUserContainer">
      {src ? (
        <>
          <div className="AvatarContainer">
            <Avatar src={src} size={150} />
          </div>
          <p className="TextName">Doãn Chí Bình</p>
        </>
      ) : (
        <div className="AvatarContainer">
          <Avatar
            style={{
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }}
          >
            U
          </Avatar>
        </div>
      )}
      <div className="InforContainer">
        <h2>Information</h2>
        <div className="InforDetailContainer">
          {data.map((value) => (
            <FormContainer key={value.id} style={{ marginTop: '10px' }}>
              <LabelComponent value={value.label} />
              <Col span={8}>
                <InputComponents
                  type={value.type}
                  isValidate={value.isValidate}
                  data={value.data}
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
