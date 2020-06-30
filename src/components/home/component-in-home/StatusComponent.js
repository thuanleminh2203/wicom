import React, { useState } from 'react'
import InputComponents from '../../../components-utils/InputComponent'
import ModalComponent from '../../../components-utils/ModalComponent'

const dataContent = {
  modalText: 'Content of the modal haha',
  title: 'Tạo bài viết',
  visible: false,
  confirmLoading: false,
}

const content = () => (
  <InputComponents
    placeholder="Bạn đang nghĩ gì thế ?"
    style={{
      backgroundColor: '#3a3b3c',
      color: '#ffffff',
      borderRadius: '2%',
      resize: 'none',
    }}
    type="textarea"
  />
)

const StatusComponent = () => {
  const [data, setData] = useState(dataContent)
  return (
    <div className="StatusContainer" onClick={() => setData({ ...data, visible: true })}>
      {content()}
      {data && <ModalComponent data={data} content={content} />}
    </div>
  )
}

export default StatusComponent
