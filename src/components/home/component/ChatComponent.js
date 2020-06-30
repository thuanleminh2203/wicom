import React from 'react'
import InputComponents from './../../../components-utils/InputComponent'
import { SendOutlined, CloseOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
const data = {
  id: 16,
  username: 'Thuan Le Minh',
  src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
}

export default function ChatComponent(props) {
  const { setIsDisplayChat } = props

  return (
    <div className="ChatContainer">
      <div className="ChatHeader">
        <img src={data.src} alt="Cant not display" />
        <span className="Username">{data.username}</span>
        <CloseOutlined
          style={{ fontSize: '16px', color: '#fff', paddingLeft: '173px' }}
          onClick={() => setIsDisplayChat(false)}
        />
      </div>
      <hr className="LineContainer" />
      <div className="ChatContent">
        <p>Lorem Ipsum has bee</p>
        <p>
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book
        </p>
        <p>
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book
        </p>
        <p>
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book
        </p>
        <p className="MyMessage">
          Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book
        </p>
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
  )
}
