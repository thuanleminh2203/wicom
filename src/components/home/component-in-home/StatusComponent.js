import React from 'react'
import InputComponents from '../../../components-utils/InputComponent'

const StatusComponent = () => {
  return (
    <div className="StatusContainer">
      <InputComponents
        placeholder="Bạn đang nghĩ gì thế ?"
        style={{
          backgroundColor: '#3a3b3c',
          color: '#ffffff',
          borderRadius: '2%',
          // overflow: 'hiden',
        }}
        type="textarea"
      />
    </div>
  )
}

export default StatusComponent
