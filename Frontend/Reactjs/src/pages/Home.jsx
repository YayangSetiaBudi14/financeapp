import React from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import Welcome from '../component/Welcome'

const Home = () => {
  return (
    <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <Navbar />
            </div>
            <Welcome />
        </div>
    </div>
  )
}

export default Home