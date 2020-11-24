import React, { useEffect, useState } from 'react'
import { ApiRequest } from '../../../constant/apiUtils'
import * as Constant from './../../../constant/Constant'

export default function UserChatComponent(props) {
  const { setIsDisplayChat } = props
  const [data, setData] = useState([])

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

  return (
    <>
      <div className="UserChatContainer">
        {data.length &&
          data.map((value) => (
            <div
              className="UserDisplay"
              key={value.id}
              onClick={() =>
                setIsDisplayChat({
                  idReceive: value.id,
                  username: value.username,
                  fullname: value.fullName,
                })
              }
            >
              <div>
                <img
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Cant not display"
                />
                <span className="Username">{value.fullName}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
