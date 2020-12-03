import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { send, connect } from './socket/SockJSClientBackup'
import { toast } from 'react-toastify'

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: () => null,
})

const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: () => null,
})

const LayoutComponent = Loadable({
  loader: () => import('./pages/UserHome'),
  loading: () => null,
})
const MyPageComponent = Loadable({
  loader: () => import('./pages/MyPage'),
  loading: () => null,
})
const Error404 = Loadable({
  loader: () => import('./pages/Error404'),
  loading: () => null,
})

// let stompClient = null
// stompClient = connect(stompClient)
// stompClient.connect(
//   {},
//   () => {
//     stompClient.subscribe('/topic/all/', (mess) => {
//       console.log('======mess1=====', mess.body)
//       toast.error(mess.body)
//     })
//   },
//   (err) => console.log('======errr1====', err)
// )

// console.log('=====stompClient======', stompClient)

function App() {
  console.log("=====appp=====")
  return (
    <div style={{ height: '100%' }}>
      {/* <button
        onClick={() =>
          stompClient.send(
            '/app/message',
            {},
            JSON.stringify({
              idSend: 1,
              from: 'myUser',
              content: 'xin chao',
              to: 'sendTo',
              idReceive: 2,
            })
          )
        }
      >
        Click me now
      </button> */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={LayoutComponent} />
          <Route path="/mypage" exact component={MyPageComponent} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
