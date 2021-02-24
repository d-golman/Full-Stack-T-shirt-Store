import React from 'react'
import { Link} from 'react-router-dom'
import './navbar.sass'

function Dropdown({show}) {
    return (
        <div className={"overlay".concat(show ? ' show' : ' hide')}>
            <div className='dropdown'>
                <ul>
                <li><Link className="navbar-link" to={'/'}>Home</Link></li>
                <li><Link  className="navbar-link" to={'/shop/'}>Shop</Link></li>
                <li><Link className="navbar-link"  to={'/cart/'}>Cart </Link></li>
                <li><Link className="navbar-link"  to={'/user/profile'}>Profile</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown
