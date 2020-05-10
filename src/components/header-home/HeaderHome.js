import React from 'react'
import { DownOutlined } from '@ant-design/icons'
const HeaderHome = () => {
  return (
    <div className="AppContainer">
      <div className="LogoContainer">
        <span className="LogoDetail">WicomLab</span>
        <span className="LoginContainer">Login</span>
      </div>
      <div className="TitleApp">
        <div>
          <div id="home-heading">
            <h1 id="home-heading-1">Digital</h1>
            <br />
            <h1 id="home-heading-2">
              Creative <span>Agency</span>
            </h1>
          </div>
          <div id="home-text">
            <p>Do your work. Don&apos;t be stupid</p>
          </div>
        </div>
        <span className="ButtonApp ButtonApp-General ButtonApp-Home">Start with we</span>
        <span id="arrow-down">
          <DownOutlined style={{ fontSize: '24px' }} />
        </span>
      </div>
    </div>
  )
}

export default HeaderHome
