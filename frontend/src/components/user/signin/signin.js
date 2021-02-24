import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { authtenticate, isAuthenticated, signIn } from '../../auth'
import Base from '../../core/base/base'
import { SignUpForm } from '../signup/signup'
import '../sign.sass'

const Signin = () => {

        return (
            <Base>
                <SignInForm path={'/'}/>
            </Base>
    )
    
}

const SignInForm = ({path}) =>{
    const onFormSubmit = (e) => {
        e.preventDefault()
        changeError(null)
        signIn(formData)
        .then(data => {
            if (data && data.error) {
                changeError(data.error)
            }
            else {
                authtenticate(data.token)
                window.location.reload();
            }

        })
        .catch(err => console.log(err))
    }
    
    const [logged, changeLogged] = useState(false)
    const [registred, setRegistred] = useState(true)
    useEffect(()  =>  {
        if (isAuthenticated()) {
            changeLogged(true)
        }
        else (
            changeLogged(false)

        )
    }, [])

    const [formData, appendData] = useState({
        email: '',
        password: ''
    })
    const [errorMessage, changeError] = useState(null)


    const handleChange = e => {
        const { type, value } = e.target;
        appendData(prevState => ({
            ...prevState,
            [type]: value
        }));
    };

    const errorBlock = (
                <div className="form-control alert"
                    style={{ display: errorMessage ? 'block' : 'none' }}>
                    {errorMessage}
                </div>
    )


    if (logged) {
        return <Redirect to={path}></Redirect>        
    }
    if (!registred){
        return <SignUpForm path={path}/>
    }
    return(
    <form className='sign-form' onSubmit={onFormSubmit}>
        <h2>Sign In</h2>
        {errorBlock}
            <input type="email" className="form-control" id="exampleInputEmail1" required placeholder="Email" onChange={handleChange} />
            <input type="password" className="form-control" id="exampleInputPassword1" required placeholder="Password" onChange={handleChange} />
            <input type="submit" id='inputSubmit' className="btn btn-dark" value='Sign In' />
            <button onClick={()=>setRegistred(false)} className="btn btn-light">Not registred yet?</button>
    </form>
    )
    
    
}

export {SignInForm}


export default Signin
