import React from 'react'
import {BrowserRouter as Router, Switch, Route, useLocation} from 'react-router-dom'

import PrivateRoute from '../auth/privateRoutes'
import Cart from '../core/cart/cart'
import Shop from '../core/shop/shop'
import Order from '../core/order/order'
import OrderSucess from '../core/order/orderSucess'
import Signin from '../user/signin/signin'
import UserDashboard from '../user/profile/userDashboard'
import Home from '../core/home/home'
import ProductCard from '../core/product-card/product-card'
import Base from '../core/base/base'



export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/shop' component={Shop}/>
                <Route exact path='/signin/' component={Signin}/>
                <Route exact path='/cart/' component={Cart}/>
                <Route exact path='/shop/:id' component={ProductCard}/>
                <PrivateRoute exact path='/order/' component={Order}/>
                <PrivateRoute exact path='/user/profile/' component={UserDashboard}/>
                <PrivateRoute exact path='/order/success/:id' component={OrderSucess}/>
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
        </Router>
    )
}

function NoMatch() {
    let location = useLocation();
  
    return (
      <Base>
        <h1>Error 404</h1>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </Base>
    );
  }