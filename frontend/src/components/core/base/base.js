import React from 'react'
import Footer from './footer/footer'
import Navbar from './navbar/navbar'
import Error from '../error/error'
import './base.sass'
const Base = ({children}) => {
    return (
    <div className="base">
        <Navbar/>            
            <Error>
            <div className="container">{children}</div>
            </Error>
        <Footer/>
    </div>
    )
}

export default Base