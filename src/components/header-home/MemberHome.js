import React from 'react'
import { Row, Col, Carousel } from 'antd'

const MemberHome = () => {
  function onChange(a, b, c) {
    console.log(a, b, c)
  }

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
        <Col span={6}>
          <Carousel afterChange={onChange}>
            <Row>
              <Col>
                <div>
                  <img src="" alt="null" />
                </div>
              </Col>
              <Col>aaa</Col>
            </Row>
          </Carousel>
        </Col>
      </Row>
    </div>
  )
}

export default MemberHome
