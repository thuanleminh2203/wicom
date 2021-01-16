import React, { useState } from 'react'
import InputComponents from '../../../components-utils/InputComponent'
import { Modal, Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

// const varToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''
// const token = `Bearer ${varToken}`
const StatusComponent = (props) => {
  const { handleOk } = props
  const [dataModal, setDataModal] = useState({
    modalText: 'Content of the modal haha',
    title: 'Tạo bài viết',
    visible: false,
    confirmLoading: false,
  })
  const [dataInput, setDataInput] = useState({ content: '' })
  const [file, setFile] = useState(null)
  const { content } = dataInput
  const { title, visible, confirmLoading } = dataModal

  const handleCancel = () => {
    setDataModal({
      ...dataModal,
      visible: false,
    })
  }

  async function onSubmitStatus() {
    // e.preventDefault()
    let url = null
    if (file) {
      const formData = new FormData()
      // var imagefile = document.querySelector('#file')
      formData.append('files', file)
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
    }

    await handleOk(content, url)
    setDataInput({ content: '' })
    handleCancel()
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

  const handleUpload = ({ fileList }) => {
    console.log('fileList', fileList[0].originFileObj)
    setFile(fileList[0].originFileObj)
  }

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
          <Upload
            beforeUpload={() => false}
            onChange={handleUpload}
            action={() => {}}
            multiple={false}
          >
            <Button icon={<UploadOutlined />} disabled={file ? true : false}>
              Click to Upload
            </Button>
          </Upload>
          <Button
            type="primary"
            size={20}
            onClick={(e) => onSubmitStatus(e)}
            loading={confirmLoading}
          >
            Đăng
          </Button>
        </Modal>
      )}
    </>
  )
}

export default StatusComponent
