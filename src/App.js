import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/home" exact component={LayoutComponent} />
          <Route path="/mypage" exact component={MyPageComponent} />
          {/* <Route component={Error404} /> */}
        </Switch>
      </Router>
    </div>
  )
}

export default App
