import React, { Fragment } from 'react'
import StatusComponent from './component-in-home/StatusComponent'
import NewsComponent from './component-in-home/NewsComponent'
import UserChatComponent from './component/UserChatComponent'
import { Row, Col } from 'antd'
// import Socket from '../../socket/Socket'
// import Socket from '../../socket/socketDemo'

export default function MainHome(props) {
  const { setIsDisplayChat, isDisplayChat } = props
  return (
    <Fragment>
      <Row>
        <Col span={18}>
          <StatusComponent />
          <NewsComponent />
          <NewsComponent />
          <NewsComponent />
        </Col>
        <Col span={6}>
          <UserChatComponent setIsDisplayChat={setIsDisplayChat} />
        </Col>
      </Row>
      {/* <Socket isDisplayChat={isDisplayChat} /> */}
    </Fragment>
  )
}
