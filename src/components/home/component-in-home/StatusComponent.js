import React, { useState } from 'react'
import InputComponents from '../../../components-utils/InputComponent'
import { Modal, Button } from 'antd'
import moment from 'moment'
import { ApiRequest } from '../../../constant/apiUtils'
import * as Constant from './../../../constant/Constant'

const StatusComponent = () => {
  const [dataModal, setDataModal] = useState({
    modalText: 'Content of the modal haha',
    title: 'Tạo bài viết',
    visible: false,
    confirmLoading: false,
  })
  const [dataInput, setDataInput] = useState({ content: '' })
  const { content } = dataInput
  const { modalText, title, visible, confirmLoading } = dataModal

  // const handleOk = () => {
  //   setDataModal({
  //     ...dataModal,
  //     modalText: 'The modal will be closed after two seconds',
  //     confirmLoading: true,
  //   })
  //   setTimeout(() => {
  //     setDataModal({
  //       ...dataModal,
  //       visible: false,
  //       confirmLoading: false,
  //     })
  //   }, 2000)
  // }

  const handleOk = async () => {
    await ApiRequest.post(Constant.API_NEWS, { content, createdAt: moment().format('DD-MM-YYYY') })
      .then((res) => console.log('===res===', res))
      .catch((err) => console.log('===er===', err))
    // setDataModal({
    //   ...dataModal,
    //   modalText: 'The modal will be closed after two seconds',
    //   confirmLoading: true,
    // })
    // setTimeout(() => {
    //   setDataModal({
    //     ...dataModal,
    //     visible: false,
    //     confirmLoading: false,
    //   })
    // }, 2000)
  }

  const handleCancel = () => {
    setDataModal({
      ...dataModal,
      visible: false,
    })
  }

  const contentModal = () => (
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

  return (
    <>
      <div
        className="StatusContainer"
        onClick={() => {
          console.log('=====avas==')
          setDataModal({ ...dataModal, visible: true })
        }}
      >
        {contentModal()}
      </div>
      {visible && (
        <Modal
          title={title}
          visible={visible}
          // onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setDataModal({ ...dataModal, visible: false })}
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
          <Button type="primary" size={20} onClick={handleOk} loading={confirmLoading}>
            Đăng
          </Button>
        </Modal>
      )}
    </>
  )
}

export default StatusComponent
