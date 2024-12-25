import React from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'

const MainLayoutAdmin = ({ children }) => {
  return (
    <>
      <div className="d-flex flex-column bg-white">
      <Header />
      <div className="d-flex">
        <Sidebar />

        <div className="p-4" style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
    </>
  )
}

export default MainLayoutAdmin