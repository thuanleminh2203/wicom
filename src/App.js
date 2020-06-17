import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

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

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={LayoutComponent} />
        {/* <Route component={Error404} /> */}
      </Switch>
    </Router>
  )
}

export default App
