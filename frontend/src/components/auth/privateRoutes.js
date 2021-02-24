import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '.'



const PrivateRoute = ({component:Component, ...rest}) => {
    if (isAuthenticated()){
        return(
            <Route {...rest} component={Component}/>
        )
    }
    else{
        return(
            <Redirect 
                to={{
                    pathname:'/signin',
                    state: {from: rest.location}
                }
                }/>
        )
    }
}

export default PrivateRoute