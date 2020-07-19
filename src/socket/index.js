import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
// import { Stomp } from '@stomp/stompjs'

function SockJSClient(props){
    // let socket = new SockJS('/secured/chat')
    // stompClient = Stomp.over(socket)
    // const [stompClient,setStompClient] = useState(Stomp.over(socket))
    let stompClient = null
    useEffect(() => {
        connect()
        // return () => {
        //     stompClient.disconnect()
        // }
    }, [])

    function connect(){
        const refreshToken ='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aHVhbnBybzIiLCJleHAiOjE1OTQ4Nzk0ODQsImlhdCI6MTU5NDg3MzQ4NH0.Xb0CQg7Tx5cVJi4pczp6GM7VWyiAkuJbsOSr-th2iPGhjyIiBdjkz9POVMrjaXaL1iNTtrNw6tmXcqVQ8chKrw'
        const headers = {
            Authorization: `Bearer ${refreshToken}`,
          }
    //    const headers = { 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aHVhbnBybzIiLCJleHAiOjE1OTQ4Nzk0ODQsImlhdCI6MTU5NDg3MzQ4NH0.Xb0CQg7Tx5cVJi4pczp6GM7VWyiAkuJbsOSr-th2iPGhjyIiBdjkz9POVMrjaXaL1iNTtrNw6tmXcqVQ8chKrw'}
        let socket = new SockJS('http://localhost:8080/secured/chat')
        stompClient = Stomp.over(socket)

        let sessionId = "";
        stompClient.debug = () => {} 
        stompClient.connect( headers, (frame) => {
            // let url = stompClient.ws._transport.url
            // url = url.replace(
            //     "http://localhost:8080/secured/chat",  "")
            // url = url.replace("/websocket", "")
            // url = url.replace(/^[0-9]+\//, "")
            // console.log("Your current session is: " + url)
            // sessionId = url;
            const username = "thuanlm"
            console.log('Connected: ' + frame)
            stompClient.subscribe('/topic/thuanlm'  ,  (mess) => {
                console.log('====mess==' + mess)
                
                // showGreeting(JSON.parse(greeting.body).content);
            });
        }, err => console.log(`loi j nhi`, err));
    }

    function send(){
        stompClient.send('/app/room/' + 'thuanlm1',{},JSON.stringify({from: 'thuanlm', mess:'xin chao'}))
    }

    return (
        <button onClick={()=> send()}>
            click me to send
        </button>
    )
}

export default SockJSClient