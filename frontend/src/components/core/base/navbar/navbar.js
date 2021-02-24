import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Dropdown from './dropdown'
import './navbar.sass'
const currentTab = (history,path)=>{
    if(history.location.pathname === path){
        return {textDecoration: 'underline'}
    } else{
        return {textDecoration: 'none'}
    }
}



const Navbar = ({history}) => {    
    const [showDropdown, setShowDropdown] = useState(false)

    const hideMenu = (e) =>{
        if(
            e.target.classList.contains('overlay')
            ){
        setShowDropdown(false)
        document.removeEventListener('click', hideMenu)
        }
    }

    const showMenu = () =>{
        document.addEventListener('click', hideMenu)
        setShowDropdown(true)
    }

    return (
        <nav className="navbar">
            <Dropdown show={showDropdown} />
            <div className="container">
            <div className="dropdown-button" onClick={showMenu}>
                <div className="dropdown-button-line"></div>
            </div>
                <div className="navbar-links">
                    <Link style={currentTab(history,'/')} className="navbar-link" to={'/'}>Home</Link>
                    <Link style={currentTab(history,'/shop/')} className="navbar-link" to={'/shop/'}>Shop</Link>
                </div>
                <div className="navbar-title">
                    <h2>
                    PROGRAMMING SHIRTS
                    </h2>
                </div>
                <div className="navbar-icons">
                    <Link to={'/cart/'}><i className="fas fa-shopping-cart"></i></Link>
                    <Link to={'/user/profile/'}><i className="fas fa-user-circle"></i></Link>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)
