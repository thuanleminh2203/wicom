import React, { useEffect, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
// import { Stomp } from '@stomp/stompjs'

function SockJSClient(props){
    // let socket = new SockJS('/secured/chat')
    // stompClient = Stomp.over(socket)
    // const [stompClient,setStompClient] = useState(Stomp.over(socket))
    let stompClient = null
    console.log(`username`, props.username );
    useEffect(() => {
        connect()
        // return () => {
        //     stompClient.disconnect()
        // }
    }, [props.username])

    function connect(){
        const refreshToken ='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aHVhbnBybzIiLCJleHAiOjE1OTQ4Nzk0ODQsImlhdCI6MTU5NDg3MzQ4NH0.Xb0CQg7Tx5cVJi4pczp6GM7VWyiAkuJbsOSr-th2iPGhjyIiBdjkz9POVMrjaXaL1iNTtrNw6tmXcqVQ8chKrw'
        const headers = {
            Authorization: `Bearer ${refreshToken}`,
          }
    //    const headers = { 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aHVhbnBybzIiLCJleHAiOjE1OTQ4Nzk0ODQsImlhdCI6MTU5NDg3MzQ4NH0.Xb0CQg7Tx5cVJi4pczp6GM7VWyiAkuJbsOSr-th2iPGhjyIiBdjkz9POVMrjaXaL1iNTtrNw6tmXcqVQ8chKrw'}
        let socket = new SockJS('http://localhost:8080/chat')
        stompClient = Stomp.over(socket)
        stompClient.debug = () => {} 
        stompClient.connect( {}, (frame) => {
            // const username = "thuanlm"
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