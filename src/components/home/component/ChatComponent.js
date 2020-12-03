/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import InputComponents from './../../../components-utils/InputComponent'
import { SendOutlined, CloseOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
import { ApiRequest } from '../../../constant/apiUtils'
import * as Constant from '../../../constant/Constant'
import { connect } from '../../../socket/SockJSClientBackup'
import { toast } from 'react-toastify'

const data = {
  id: 16,
  username: 'Thuan Le Minh',
  src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
}

const dataSocket = null
let stompClient = null
let subscription = null

const myId = localStorage.getItem('id') ? localStorage.getItem('id') : ''
const myUser = localStorage.getItem('username') ? localStorage.getItem('username') : ''

export default function ChatComponent(props) {
  const { setIsDisplayChat, isDisplayChat } = props
  const [dataMess, setDataMess] = useState([])
  const [dataInput, setDataInput] = useState({ content: '' })
  const { username, idReceive } = isDisplayChat
  const [dataSocket, setDataSocket] = useState(null)
  const { content } = dataInput

  useEffect(() => {
    connectSocket()
    // console.log('=====????====', subscription)
    // return () => {
    //   subscription && stompClient.unsubscribe(subscription.id)
    // }
  }, [])

  useEffect(() => {
    console.log('====datasoclet=====', dataSocket)
    dataSocket && setDataMess([...dataMess, dataSocket])
  }, [dataSocket])

  function connectSocket() {
    stompClient = connect()
    stompClient.connect(
      {},
      () => {
        subscription = stompClient.subscribe('/topic/chat/' + myUser, (mess) => {
          setDataSocket(JSON.parse(mess.body))
          toast.success(mess.body)
        })
      },
      (err) => console.log('======errr2====', err)
    )
  }

  function sendMessageSocket() {
    console.log('==content===', content.length)
    if (content.length) {
      stompClient.send(
        '/app/message',
        {},
        JSON.stringify({ idSend: myId, from: myUser, content, to: username, idReceive })
      )
      setDataSocket({ idSend: myId, from: myUser, content, to: username, idReceive })
      setDataInput({ ...dataInput, content: '' })
    }
  }
  useEffect(() => {
    if (idReceive) {
      onGetMess()
    }
  }, [idReceive])

  async function onGetMess() {
    await ApiRequest.get(Constant.API_MESS + idReceive)
      .then((res) => {
        const { data: body = {} } = res
        const { data = [] } = body
        setDataMess(data)
      })
      .catch((err) => console.log('=====err====', err))
  }

  return (
    <div className="ChatContainer">
      <div className="ChatHeader">
        <img src={data.src} alt="Cant not display" />
        <span className="Username">{isDisplayChat.fullname}</span>
        <CloseOutlined
          style={{ fontSize: '16px', color: '#fff', paddingLeft: '173px' }}
          onClick={() => setIsDisplayChat(null)}
        />
      </div>
      <hr className="LineContainer" />
      <div className="ChatContent">
        {dataMess &&
          dataMess.length > 0 &&
          dataMess.map((element) => (
            <div
              key={element.messageId}
              style={{ display: 'flex', position: 'relative', minHeight: '25px' }}
            >
              <p
                style={{ float: 'right' }}
                className={`${parseInt(myId) === parseInt(element.idSend) ? 'MyMessage' : ''}`}
              >
                {element.content}
              </p>
            </div>
          ))}
      </div>
      <hr className="LineContainer" />
      <Row>
        <Col span={20}>
          <InputComponents
            style={{
              backgroundColor: '#3e4042',
              color: '#ffffff',
              borderRadius: '2%',
              overflowY: 'scroll',
              height: '32px',
            }}
            type="textarea"
            dataInput={dataInput}
            setDataInput={setDataInput}
            value={content}
            name="content"
            span={24}
            sendMessageSocket={sendMessageSocket}
          />
        </Col>
        <Col span={4}>
          <SendOutlined style={{ fontSize: '23px', color: '#1890ff' }} />
        </Col>
      </Row>
    </div>
  )
}
