import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import InputComponents from './InputComponent'

const showContentModal = (type) => {
  switch (type) {
    case 1:
      return (
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
  }
}

export default function ModalComponent(props) {
  const { data } = props
  const [dataModal, setDataModal] = useState({ ...data })
  console.log('=====visialbe1111111111', dataModal)
  const { confirmLoading, visible, title } = dataModal

  useEffect(() => {
    // setDataModal({ ...dataModal, visible })
    console.log('=====visialbe', data)
  })

  const handleOk = () => {
    setDataModal({
      ...dataModal,
      modalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    })
    setTimeout(() => {
      setDataModal({
        ...dataModal,
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setDataModal({
      ...dataModal,
      visible: false,
    })
  }

  return (
    <div className="ModalContainer">
      <Modal
        title={title}
        visible={visible}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
        // closable={false}
      >
        {showContentModal(1)}
        <Button type="primary" size={20} onClick={handleOk}>
          Đăng
        </Button>
      </Modal>
    </div>
  )
}
