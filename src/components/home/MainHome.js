import React, { Fragment } from 'react'
import StatusComponent from './component-in-home/StatusComponent'
import NewsComponent from './component-in-home/NewsComponent'

export default function MainHome() {
  return (
    <Fragment>
      <StatusComponent />
      <NewsComponent />
    </Fragment>
  )
}
