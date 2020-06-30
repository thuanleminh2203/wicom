import React, { Fragment } from 'react'
import StatusComponent from './component-in-home/StatusComponent'
import NewsComponent from './component-in-home/NewsComponent'
import UserChatComponent from './component/UserChatComponent'
import { Row, Col } from 'antd'

export default function MainHome(props) {
  const { setIsDisplayChat } = props
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
    </Fragment>
  )
}
