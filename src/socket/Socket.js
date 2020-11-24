// import React, { useState, useRef, useEffect } from 'react'
// // import SockJsClient from 'react-stomp'
// import io from 'socket.io-client'

// const myUser = localStorage.getItem('username') ? localStorage.getItem('username') : ''

// // const socket = io('http://localhost:8080, {
// //   transports: ['websocket', 'polling'],
// // })

// export default function Socket(props) {
//   //   const { isDisplayChat } = props
//   //   const { username: sendTo = null, idReceive } = isDisplayChat
//   //   const [clientConnected, setClientConnected] = useState(false)
//   //   const [message, setMessage] = useState([])
//   //   const clientRef = useRef(null)
//   //   function onConnectSocket(e) {
//   //     console.log('===connect==', e)
//   //   }

//   //   function onDisconnect(e) {
//   //     console.log('===onDisconnect==', e)
//   //   }

//   //   const sendMessage = (msg) => {
//   //     this.clientRef.sendMessage('/topics/all', msg)
//   //   }

//   // useEffect(() => {
//   //   // connect()
//   //   socket.on('connect', (frame) => {
//   //     console.log('===frame==', frame)
//   //   })
//   // }, [])

//   // function connect() {
//   //   const socket = io(
//   //     'http://localhost:8080/secured/room' + '/secured/user/queue/specific-user' + myUser,
//   //     {
//   //       cors: true,
//   //       origins: ['http://localhost:8080'],
//   //     }
//   //   )
//   //   socket.on('connect', (frame) => {
//   //     console.log('===frame==', frame, socket.connected)
//   //   })
//   // }

//   //   console.log('===url==', '/secured/user/queue/specific-user' + myUser)

//   return (
//     <></>
//     // <SockJsClient
//     //   //   ref={(client) => {
//     //   //     this.clientRef = client
//     //   //   }}
//     //   url="http://localhost:8080/secured/room"
//     //   topics={['/secured/user/queue/specific-user' + myUser]}
//     //   onMessage={(msg) => {
//     //     console.log(msg)
//     //   }}
//     //   onConnect={(e) => onConnectSocket(e)}
//     //   onDisconnect={(e) => onDisconnect(e)}
//     //   ref={(client) => {
//     //     this.clientRef = client
//     //   }}
//     // />
//   )
// }
