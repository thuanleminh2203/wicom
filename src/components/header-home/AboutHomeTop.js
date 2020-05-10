import React from 'react'
import { Row, Col } from 'antd'

const AboutHomeTop = () => {
  return (
    <div className="AboutContainer">
      <div className="AboutTop">
        <Row justify="center">
          <Col span={8}>
            <div className="AboutTop-left">
              <div className="Vertical-heading">
                <h5>Who We Are</h5>
                <strong>A Story</strong>
                <br />
                <h2>About Us</h2>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <p>
              PTN thông tin vô tuyến (WicomLab) là cơ sở nghiên, thiết kế và thử nghiệm các thiết bị
              truyền thông không dây, các mạch điện tử tương tự, mạch số, vi điều khiển và hệ thống
              thông tin vô tuyến
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est expedita nihil
              voluptatibus pariatur ab natus, explicabo optio illo culpa placeat, velit, numquam rem
              fugiat aliquam excepturi nesciunt delectus rerum ut.
            </p>
          </Col>
        </Row>
        <Row justify="center">
          <div className="ImageAbout" />
        </Row>
      </div>
    </div>
  )
}
export default AboutHomeTop
