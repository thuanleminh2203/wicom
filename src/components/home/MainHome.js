import React, { Fragment, useEffect, useState } from 'react'
import StatusComponent from './component-in-home/StatusComponent'
import NewsComponent from './component-in-home/NewsComponent'
import UserChatComponent from './component/UserChatComponent'
import { Row, Col } from 'antd'
import { ApiRequest } from '../../constant/apiUtils'
import * as Constant from './../../constant/Constant'
import moment from 'moment'

// import Socket from '../../socket/Socket'
// import Socket from '../../socket/socketDemo'

export default function MainHome(props) {
  const { setIsDisplayChat, isDisplayChat } = props
  const [page, setPage] = useState({ pageIndex: 1, pageSize: 20 })
  const [news, setNews] = useState([])
  const { pageIndex, pageSize } = page

  useEffect(() => {
    getNews()
  }, [])

  async function getNews() {
    await ApiRequest.get(Constant.API_NEWS, { pageIndex, pageSize })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        const { listNewsSearch = [] } = body
        setNews([...news, ...listNewsSearch])
      })
      .catch((err) => {
        console.log('=====err====', err)
      })
  }

  const handleOk = async (content) => {
    await ApiRequest.post(Constant.API_NEWS, { content, createdAt: moment().format('DD-MM-YYYY') })
      .then((res) => {
        const { data = {} } = res
        const { data: body = {} } = data
        setNews([body,...news])

      })
      .catch((err) => console.log('===er===', err))
  }


  return (
    <Fragment>
      <Row>
        <Col span={18}>
          <StatusComponent handleOk={handleOk} />
          {news.map((value) => (
            <NewsComponent key={value.newsId} dataNews={value}  />
          ))}
        </Col>
        <Col span={6}>
          <UserChatComponent setIsDisplayChat={setIsDisplayChat} />
        </Col>
      </Row>
    </Fragment>
  )
}
