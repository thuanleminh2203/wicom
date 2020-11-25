/* eslint-disable react/display-name */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'

const myUser = localStorage.getItem('username') ? localStorage.getItem('username') : ''
const idSend = localStorage.getItem('id') ? localStorage.getItem('id') : ''

let stompClient = null
let subscription = null

const SockJSClient = React.memo((props) => {
  const { username: sendTo = null, idReceive, dataMess, setDataMess } = props
  const [test, setTest] = useState(null)

  useEffect(() => {
    test && setDataMess([...dataMess, test])
  }, [test])

  useEffect(() => {
    connect()
    return () => {
      subscription && stompClient.unsubscribe(subscription.id)
    }
  }, [subscription])

  // connect
  function connect() {
    const socket = new SockJS('http://localhost:8080/ws')
    stompClient = Stomp.over(socket)

    stompClient.connect(
      {},
      () => {
        subscription = stompClient.subscribe('/topic/all/' + myUser, (mess) => {
          const data = JSON.parse(mess.body)
          setTest(data)
        })
      },
      (err) => console.log('======errr====', err)
    )
  }

  //send mess
  function send() {
    if (myUser && sendTo && stompClient) {
      stompClient.send(
        '/app/message',
        {},
        JSON.stringify({ idSend, from: myUser, content: 'xin chao', to: sendTo, idReceive })
      )
      setTest({ idSend, from: myUser, content: 'xin chao', to: sendTo, idReceive })
    }
  }

  return <button onClick={() => send()}>click me to send</button>
})
export default SockJSClient
