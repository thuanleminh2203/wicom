import React,{useEffect,useState} from 'react'
import InputComponents from './../../../components-utils/InputComponent'
import { SendOutlined, CloseOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
import SockJSClient from '../../../socket'
import { ApiRequest } from '../../../constant/apiUtils'
import  * as Constant  from '../../../constant/Constant'

const data = {
  id: 16,
  username: 'Thuan Le Minh',
  src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
}

const myId = localStorage.getItem('id') ? localStorage.getItem('id') : ''
export default function ChatComponent(props) {
  const { setIsDisplayChat, isDisplayChat } = props
  const { username, idReceive} = isDisplayChat
  const [dataMess, setDataMess] = useState([])
  // console.log("====dataMess===",dataMess);

  useEffect(() => {
    if(idReceive){
      onGetMess()

    } 
  }, [idReceive])

  async function onGetMess(){
    await ApiRequest.get(Constant.API_MESS+idReceive)
    .then((res) => {
      const { data: body = {} } = res
      const { data = [] } = body
      setDataMess(data)
    })
    .catch((err) => console.log("=====err====", err))
  }

  return (
    <>
      <SockJSClient username={username} idReceive={idReceive} setDataMess={setDataMess} dataMess={dataMess} />
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
          {dataMess.length && dataMess.map((element)  => <div style={{display:'flex',position:'relative',minHeight:'25px'}}><p key={element.messageId} style={{float:'right'}} className={ `${ parseInt(myId) === parseInt(element.idSend) ? 'MyMessage':''}`}>{element.content}</p></div>)}
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
            />
          </Col>
          <Col span={4}>
            <SendOutlined style={{ fontSize: '23px', color: '#1890ff' }} />
          </Col>
        </Row>
      </div>
    </>
  )
}
