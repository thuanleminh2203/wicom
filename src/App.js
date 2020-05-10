import React, { Fragment } from 'react'
import HeaderHome from './components/header-home/HeaderHome'
import AboutHome from './components/header-home/AboutHome'
import MemberHome from './components/header-home/MemberHome'

function App() {
  return (
    <Fragment>
      <HeaderHome />
      <AboutHome />
      <MemberHome />
    </Fragment>
  )
}

export default App
