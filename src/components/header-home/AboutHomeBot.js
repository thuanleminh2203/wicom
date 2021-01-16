/* eslint-disable max-len */
import React from 'react'
import { Row, Col } from 'antd'

const AboutHomeBot = () => {
  const data = [
    {
      id: 1,
      iconUrl: 'https://img.icons8.com/ios-glyphs/30/000000/rocket.png',
      title: 'Mission',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut voluptatem, uidem impedit tempora delectus, cumque molestiae.',
    },
    {
      id: 2,
      iconUrl: 'https://img.icons8.com/metro/26/000000/visible.png',
      title: 'Vission',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut voluptatem, uidem impedit tempora delectus, cumque molestiae.',
    },
    {
      id: 3,
      iconUrl: 'https://img.icons8.com/windows/32/000000/pencil-tip.png',
      title: 'Passion',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut voluptatem, uidem impedit tempora delectus, cumque molestiae.',
    },
  ]

  return (
    <div className="AboutContainerBot">
      <Row justify="center">
        {data.map((value) => (
          <Col span={6} key={value.id}>
            <div className="BoxAboutDetails">
              <div>
                <img src={value.iconUrl} alt="null" />
                <h3 style={{ color: 'black' }}>{value.title}</h3>
                <hr />
                <p style={{ color: 'black', width: '60%', margin: 'auto' }}>{value.content}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
export default AboutHomeBot
