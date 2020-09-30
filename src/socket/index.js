/* eslint-disable max-len */
import React, { useEffect } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
// import { Stomp } from '@stomp/stompjs'

function SockJSClient(props) {
  // let socket = new SockJS('/secured/chat')
  // stompClient = Stomp.over(socket)
  // const [stompClient,setStompClient] = useState(Stomp.over(socket))
  let stompClient = null
  // console.log('username', props.username)
  useEffect(() => {
    connect()
    // return () => {
    //     stompClient.disconnect()
    // }
  }, [props.username])
  let sessionId = ''

  function connect() {
    const socket = new SockJS('http://localhost:8080/secured/room')
    stompClient = Stomp.over(socket)
    stompClient.debug = () => {}

    stompClient.connect(
      {},
      (frame) => {
        console.log('Connected: ' + frame)
        let url = stompClient.ws._transport.url
        url = url.replace('/websocket', '')
        url = url.replace(/^[0-9]+\//, '')
        url = url.replace('ws://localhost:8080', '')
        sessionId = url
        console.log('Your current session is: ' + sessionId)
        // /secured/user/queue/specific-user/c3nj1di0
        stompClient.subscribe('/secured/user/queue/specific-user/' + sessionId, (mess) =>
          // /secured/user/queue/specific-user
          console.log('====mess==' + mess)
        )
      },
      (err) => console.log('======errr====', err)
    )
  }

  // stompClient.connect(
  //   {},
  //   (frame) => {
  //     console.log('Connected: ' + frame)
  //     stompClient.subscribe('/topic/thuanlm', (mess) => {
  //       console.log('====mess==' + mess)

  //       // showGreeting(JSON.parse(greeting.body).content);
  //     })
  //   },
  //   (err) => console.log('loi j nhi', err)
  // )
  // }
  // )
  // }
  function send() {
    stompClient.send(
      '/spring-security-mvc-socket/secured/room',
      {},
      JSON.stringify({ from: 'thuanlm', text: 'xin chao', to: 'sonbeo' })
    )
  }

  return <button onClick={() => send()}>click me to send</button>
}
export default SockJSClient
