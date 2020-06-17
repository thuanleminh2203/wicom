import React from 'react'
import { Avatar } from 'antd'
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
]
const ProfileUser = () => {
  return (
    <div className="ProfileUserContainer">
      {src ? (
        <Avatar src={src} size={150} />
      ) : (
        <Avatar
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
        >
          U
        </Avatar>
      )}
      <div className="InforContainer">
        <h2>Information</h2>
        {data.map((value) => (
          <FormContainer key={value.id}>
            <LabelComponent value={value.label} />
            <InputComponents type={value.type} isValidate={value.isValidate} data={value.data} />
          </FormContainer>
        ))}
      </div>
    </div>
  )
}

export default ProfileUser
