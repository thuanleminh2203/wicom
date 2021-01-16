import React, { useEffect, useState } from 'react'
import { ApiRequest } from '../../../constant/apiUtils'
import * as Constant from './../../../constant/Constant'
import { Badge } from 'antd'

export default function UserChatComponent(props) {
  const { setIsDisplayChat } = props
  const [data, setData] = useState([])
  // const [hover, setHover] = useState(null)

  useEffect(() => {
    ApiRequest.get(Constant.API_USER_FIND_ALL)
      .then((res) => {
        const { data: body = {} } = res
        const { data: dataUser = {} } = body
        // console.log('=====data', dataUser)
        setData(dataUser)
      })
      .catch((err) => console.log('====errr==' + err))
  }, [])

  // function testHover(e) {
  //   console.log('===event====', e)
  //   // setHover()
  // }

  return (
    <>
      <div className="UserChatContainer">
        {data.length &&
          data.map((value) => (
            <div key={value.id} className="UserFirstContainer">
              <div
                className="UserDisplay"
                onClick={() =>
                  setIsDisplayChat({
                    idReceive: value.id,
                    username: value.username,
                    fullname: value.fullName,
                    avatar: value.avatarUrl,
                  })
                }
                // onMouseEnter={() => setHover(true)}
                // onMouseLeave={() => setHover(false)}
              >
                <Badge count={5} offset={[10, 10]}>
                  <div>
                    <img
                      style={{ borderRadius: '50%' }}
                      src={value.avatarUrl}
                      alt="Cant not display"
                    />
                    <span className="Username">{value.fullName}</span>
                  </div>
                </Badge>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
