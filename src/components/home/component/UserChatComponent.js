import React , { useEffect } from 'react'
import { ApiRequest } from '../../../constant/apiUtils'
import axios from 'axios'

const data = [
  {
    id: 1,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 2,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 3,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 4,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 5,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 7,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 8,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 9,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 10,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 11,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },

  {
    id: 12,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 13,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 14,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 15,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 16,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 17,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 18,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 19,
    username: 'Thuan Le Minh',
    src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
]
const varToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aHVhbnBybzIiLCJleHAiOjE1OTQ5Njg5MDAsImlhdCI6MTU5NDk2MjkwMH0.S_SC2mqhjhNoo1_agHzv0wdfAAakEMD7eWUuhPs_LcIFelc8V2ldPJ0h20qLhAxTJDixuao2Vb-ReQpgvcF9pA'
// const headers =  {
//     // 'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + varToken
//   }
// const config = {
  // const headers = { Authorization: `Bearer ${varToken}` }
// };



export default function UserChatComponent(props) {
  useEffect(() => {
    // const headers = { Authorization: `Bearer ${varToken}` }
    ApiRequest.get('/find-all')
    // console.log("=====jwt===" + headers)
    // axios.get('http://localhost:8080/find-all', {headers})
    // .then((res) => console.log("=====res==" + res))
    // .catch((err) => console.log("====errr==" + err))
  }, [])
  const { setIsDisplayChat } = props
  return (
    <>
      <div className="UserChatContainer">
        {data.map((value) => (
          <div className="UserDisplay" key={value.id} onClick={() => setIsDisplayChat(true)}>
            <div>
              <img src={value.src} alt="Cant not display" />
              <span className="Username">{value.username}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
