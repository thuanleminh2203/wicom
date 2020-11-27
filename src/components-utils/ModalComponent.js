import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import InputComponents from './InputComponent'

export default function ModalComponent(props) {
  const { data } = props
  const [dataModal, setDataModal] = useState({ ...data })
  const { confirmLoading, visible, title } = dataModal
  const [dataInput, setDataInput] = useState({ content: '' })
  const { content } = dataInput

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
        <InputComponents
          placeholder="Bạn đang nghĩ gì thế ?"
          style={{
            backgroundColor: '#3a3b3c',
            color: '#ffffff',
            borderRadius: '2%',
            resize: 'none',
          }}
          span={24}
          type="textarea"
          dataInput={dataInput}
          setDataInput={setDataInput}
          name="content"
          value={content}
        />
        <Button type="primary" size={20} onClick={handleOk}>
          Đăng
        </Button>
      </Modal>
    </div>
  )
}
