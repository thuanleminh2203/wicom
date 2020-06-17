import React, { useState } from 'react'
import { Row, Col, Carousel } from 'antd'
import member1 from './../../styles/images/team/team-1.jpg'
import member2 from './../../styles/images/team/team-2.jpg'
import member3 from './../../styles/images/team/team-3.jpg'
import fb from './../../styles/icons/fb.png'
import gmail from './../../styles/icons/gmail.png'
const MemberHome = () => {
  const [isChangeBackground, setIsChangeBackground] = useState(false)

  return (
    <div className="MemberContainer">
      <Row justify="center">
        <Col span={6}>
          <div className="MemberTop-left">
            <div className="Vertical-heading">
              <h5>Who We Are</h5>
              <strong>Meet Our</strong>
              <br />
              <h2>Talented Team</h2>
            </div>
            <p>
              &nbsp;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, sapiente, magni
              accusantium maxime, ipsam illum repudiandae aliquid molestiae esse dolores quasi nihil
              fuga sunt, hic laudantium! Quam vitae nam incidunt!
            </p>
          </div>
        </Col>
        <Col span={6} className="ImageMemberContainer">
          <div>
            <Carousel justify="end" autoplay={true}>
              <div
                className="ImageMember"
                onMouseEnter={() => setIsChangeBackground(true)}
                onMouseLeave={() => setIsChangeBackground(false)}
              >
                <img src={member1} alt="null" />
                <div className={isChangeBackground ? 'ImageOverlay' : ''}>
                  <h3>Cristiano</h3>
                  <p>Web Design</p>
                  <ul className="SocialList">
                    <li>
                      <a href="#" className="Facebook">
                        <img src={fb} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="Gmail">
                        <img src={gmail} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="ImageMember"
                onMouseEnter={() => setIsChangeBackground(true)}
                onMouseLeave={() => setIsChangeBackground(false)}
              >
                <img src={member2} alt="null" />
                <div className={isChangeBackground ? 'ImageOverlay' : ''}>
                  <h3>Cristiano</h3>
                  <p>Web Design</p>
                  <ul className="SocialList">
                    <li>
                      <a href="#" className="Facebook">
                        <img src={fb} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="Gmail">
                        <img src={gmail} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="ImageMember"
                onMouseEnter={() => setIsChangeBackground(true)}
                onMouseLeave={() => setIsChangeBackground(false)}
              >
                <img src={member3} alt="null" />
                <div className={isChangeBackground ? 'ImageOverlay' : ''}>
                  <h3>Cristiano</h3>
                  <p>Web Design</p>
                  <ul className="SocialList">
                    <li>
                      <a href="#" className="Facebook">
                        <img src={fb} />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="Gmail">
                        <img src={gmail} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default MemberHome
