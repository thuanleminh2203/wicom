import React, { useState } from 'react'
import { Layout, Menu, Avatar } from 'antd'
import {
  HomeOutlined,
  UsergroupDeleteOutlined,
  ProjectOutlined,
  UserOutlined,
} from '@ant-design/icons'
// import { Link, useHistory } from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route, useRouteMatch } from 'react-router-dom'
// import MyPageComponents from '../mypage/MyPageComponent'
import ProfileUser from './profile/ProfileUser'
// import StatusComponent from '../home/component-in-home/StatusComponent'
import MainHome from '../home/MainHome'
import ChatComponent from '../home/component/ChatComponent'

const data = [
  {
    key: '1',
    component: <HomeOutlined style={{ fontSize: '28px' }} />,
  },
  {
    key: '2',
    component: <UsergroupDeleteOutlined style={{ fontSize: '28px' }} />,
  },
  {
    key: '3',
    component: <ProjectOutlined style={{ fontSize: '28px' }} />,
  },
  {
    key: '4',
    component: <UserOutlined style={{ fontSize: '28px' }} />,
  },
]
const { Header, Content, Footer } = Layout
const src = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'

const LayoutComponent = () => {
  const [idSelect, setIdSelect] = useState('1')

  const switchBody = (key) => {
    // console.log("======key",key);
    switch (key) {
      case '1':
        return <MainHome />
      case '2':
        return <h1>22222222222222222</h1>
      case '3':
        return <h1>333333333333333333</h1>
      case '4':
        return <ProfileUser />

      default:
        return <h1>222222</h1>
    }
  }
  return (
    <Layout className="UserHomeContainer">
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          backgroundColor: '#242526',
          borderBottom: '1px solid #666565',
        }}
      >
        <div className="logo">WicomLab</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          {data.map((value) => (
            <Menu.Item key={value.key} onClick={(e) => setIdSelect(e.key)}>
              {value.component}
            </Menu.Item>
          ))}
        </Menu>
        <div className="ToolHeaderContainer">
          <div>
            <Avatar src={src} size={40} />
            <span
              style={{
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: '600',
                paddingLeft: '12px',
              }}
            >
              Doãn Chí Bình
            </span>
          </div>
        </div>
      </Header>
      <Content className="site-layout" style={{ marginTop: 64, backgroundColor: '#18191a' }}>
        <div
          className="site-layout-background"
          style={{ padding: '0px 0px 24px 0px', minHeight: 380 }}
        >
          {switchBody(idSelect)}
          <ChatComponent />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}

export default LayoutComponent
