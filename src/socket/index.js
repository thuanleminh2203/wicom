/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'

const myUser= localStorage.getItem('username') ? localStorage.getItem('username') : ''
const idSend= localStorage.getItem('id') ? localStorage.getItem('id') : ''

let stompClient = null
// const dataDemo = []
function SockJSClient(props) {
  const { username: sendTo = null , idReceive, dataMess, setDataMess} = props
  // const dataDemo = dataMess
  const [dataDemo,setDataDemo] = useState([])
  useEffect(() => {
    connect()

  }, [connect])

  useEffect(()=>{
    return ()=>{
      stompClient.disconnect()
    }
  },[])
  // console.log("datade,o======" , dataMess);

  // useEffect(()=>{
  //   console.log("datade,o======" , [...dataMess,...dataDemo]);
  //   setDataMess([...dataMess,...dataDemo])
  // },[dataDemo])


  // console.log("====datames===",[...demmo,"123123"])
  // console.log("====dataMess===",dataMess);

  function connect() {
    const socket = new SockJS('http://localhost:8080/secured/room')
    stompClient = Stomp.over(socket)

    console.log("===data1==",dataMess)
    stompClient.connect(
      {},
      (frame) => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/secured/user/queue/specific-user' + myUser, (mess,dataDemo) =>{
           const data = JSON.parse(mess.body)
          //  setDataDemo([...dataDemo,data])
           console.log("===data==",dataDemo)
          //  dataMess.push(data)
            // dataDemo.push(data)
            // setDataMess([...dataMess,data])
        }
            // console.log("==mes ???===",mess.body.messageId)
        )
      },
      (err) => console.log('======errr====', err)
    )

  }

  function send() {
    if(myUser && sendTo && stompClient){
      stompClient.send(
        '/spring-security-mvc-socket/secured/room',
        {},
        JSON.stringify({ idSend, from: myUser, content: 'xin chao', to: sendTo, idReceive})
      )
    }
  }

  return <button onClick={() => send()}>click me to send</button>
}
export default SockJSClient
