// import React, { useRef, useState } from 'react'
// import SockJsClient from 'react-stomp'

// function SampleComponent() {
//   let clientRef = useRef(null)
//   const [demo, setDemo] = useState([])
//   const sendMessage = (msg) => {
//     clientRef.sendMessage('/app/message', msg)
//   }
//   console.log('======message======', demo)

//   return (
//     <div>
//       <SockJsClient
//         url="http://localhost:8080/ws"
//         topics={['/topic/all']}
//         onMessage={(msg) => {
//           //   console.log('======message======', msg)
//           setDemo([...demo, msg])
//         }}
//         // ref={(client) => {
//         //   this.clientRef = client
//         // }}
//         ref={(client) => {
//           clientRef = client
//         }}
//       />
//       <button
//         onClick={() =>
//           sendMessage(
//             JSON.stringify({
//               idSend: 1,
//               from: 'thuanm',
//               content: 'xin chao',
//               to: 'son',
//               idReceive: 2,
//             })
//           )
//         }
//       >
//         Click me
//       </button>
//     </div>
//   )
// }
// export default SampleComponent
