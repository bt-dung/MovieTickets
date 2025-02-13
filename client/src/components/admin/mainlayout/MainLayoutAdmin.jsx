import React from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'

const MainLayoutAdmin = ({ children }) => {
  return (
    <>
      <div class="wrapper">
        <Sidebar />
        <div class="content-page">
          <div class="content">
            <Header />
            <div class="container-fluid mt-3 ">
              <main>{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainLayoutAdmin