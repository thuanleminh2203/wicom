import React from 'react'
import { Avatar } from 'antd'

const src = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

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
      </div>
    </div>
  )
}

export default ProfileUser
