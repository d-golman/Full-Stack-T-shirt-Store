import React from 'react'
import {connect} from 'react-redux'
import {setError} from '../../../services/store/actions'

import './error.sass'
const Error = ({children, error, setError}) => {
    if (!error){
    return (
        <>
        {children}
        </>
    )
    }
    else{
        return(
            <div className="error-block">
            <h2>Oh, seems like something went wrong.</h2>
            <a onClick={()=>setError(false)} href={'/'} className='btn btn-black'>Give us one more chance, please</a>
            </div>
        )
    }
}


const mapDispatchToProps = {
    setError,
}
const mapStateToProps = (state) => ({
    error: state.error
})

export default connect(mapStateToProps,mapDispatchToProps)(Error)
