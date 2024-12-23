import React from 'react'
import Header from '../header/Header'

const MainLayoutAdmin = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <main>{children}</main>
    </>
  )
}

export default MainLayoutAdmin