import React from 'react'
import { Link } from 'react-router-dom'
import './footer.sass'

function Footer() {
    return (
        <footer>
            <div className="container">
            <h2>PROGRAMMING SHIRTS</h2>
            <div className="footer-links">
                <Link className="footer-link" to="/">HOME</Link>
                <Link className="footer-link" to="/shop/">SHOP</Link>
                <Link className="footer-link" to="/cart/">CART</Link>
            </div>            
            <hr/>
            <p>©2020 Programmers Shirts. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer
