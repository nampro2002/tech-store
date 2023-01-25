import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import {Outlet} from 'react-router-dom'
export default function MainPage() {
    return (
        <div>
            <Navbar />
           <div style={{marginTop:'150px'}}>
           <Outlet/>
           </div>
          
            <Footer/>
        </div>
    )
}
