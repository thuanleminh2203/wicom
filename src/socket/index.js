/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'

const myUser = localStorage.getItem('username') ? localStorage.getItem('username') : ''
const idSend = localStorage.getItem('id') ? localStorage.getItem('id') : ''

let stompClient = null
let subscription = null
// const dataDemo = []
function SockJSClient(props) {
  const { username: sendTo = null, idReceive, dataMess, setDataMess } = props
  const [test, setTest] = useState(null)
  // useEffect(() => {
  //   connect()
  //   // return () => {
  //   //   subscription && stompClient.unsubscribe(subscription.id)
  //   // }
  // }, [])

  useEffect(() => {
    test && setDataMess([...dataMess, test])
  }, [test])

  useEffect(() => {
    // setDataMess([...dataMess, test])
    // console.log('====test====', test)
    // console.log('====subscription====', subscription)
    connect()
    return () => {
      subscription && stompClient.unsubscribe(subscription.id)
    }
  }, [subscription])

  // useEffect(() => {
  //   !subscription && connect()
  //   console.log('=====subscription======', subscription)
  //   return () => {
  //     console.log('=====Unsubscription======', subscription)
  //     stompClient && stompClient.unsubscribe(subscription.id)
  //     stompClient = null
  //   }
  // }, [subscription])

  function connect() {
    const socket = new SockJS('http://localhost:8080/ws')
    stompClient = Stomp.over(socket)

    stompClient.connect(
      {},
      () => {
        subscription = stompClient.subscribe('/topic/all/' + myUser, (mess) => {
          const data = JSON.parse(mess.body)
          // console.log('===data==', dataMess)
          // setDataMess([...dataMess, data])
          setTest(data)
        })
      },
      (err) => console.log('======errr====', err)
    )
  }

  // useEffect(() => {
  //   console.log('===subscription===', subscription)
  // }, [subscription])

  // function disconnect() {
  //   stompClient.unsubscribe()
  // }

  function send() {
    if (myUser && sendTo && stompClient) {
      stompClient.send(
        '/app/message',
        {},
        JSON.stringify({ idSend, from: myUser, content: 'xin chao', to: sendTo, idReceive })
      )
    }
  }

  return <button onClick={() => send()}>click me to send</button>
}
export default SockJSClient
