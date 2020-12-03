import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'

let stompClient = null
// const subscription = null

// connect
function connect() {
  if (!stompClient) {
    const socket = new SockJS('http://localhost:8080/ws')
    stompClient = Stomp.over(socket)
  }

  //   stompClient.connect(
  //     {},
  //     () => {
  //       stompClient.subscribe('/topic/all/', (mess) => {
  //         const data = JSON.parse(mess.body)
  //       })
  //       console.log('===subscription==', subscription)
  //     },
  //     (err) => console.log('======errr====', err)
  //   )
  return stompClient
}

//send mess
// function send(distination) {
//   stompClient.send(distination, {})
//   //   stompClient.send('/app/message', {})
// }

export { connect }
