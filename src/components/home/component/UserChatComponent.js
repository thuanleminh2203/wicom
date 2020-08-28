import React , { useEffect , useState } from 'react'
import { ApiRequest } from '../../../constant/apiUtils'

export default function UserChatComponent(props) {
  const { setIsDisplayChat } = props
  const [data,setData] = useState([])

  useEffect(() => {
    
    ApiRequest.get('/find-all')
    .then((res) => {
      const { data : body = {} } = res
      const { data : dataUser = {} } = body
      console.log("=====data", dataUser)
      setData(dataUser)
    })
    .catch((err) => console.log("====errr==" + err))
  }, [])


  return (
    <>
      <div className="UserChatContainer">
        {data.length && data.map((value) => (
          <div className="UserDisplay" key={value.id} onClick={() => setIsDisplayChat({username:value.username,fullname: value.fullname})}>
            <div>
              <img src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' alt="Cant not display" />
              <span className="Username">{value.fullname}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
