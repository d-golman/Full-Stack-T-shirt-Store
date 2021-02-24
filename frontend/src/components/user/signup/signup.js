import React, { useEffect, useState } from 'react'
import { Redirect,  } from 'react-router-dom'
import { authtenticate, isAuthenticated, signIn, signUp } from '../../auth'
import '../sign.sass'
import { SignInForm } from '../signin/signin'



const SignUpForm = ({path}) => {
    const [formData, appendData] = useState({})
    const [errorMessage, changeError] = useState(null)
    const [registred, setRegistred] = useState(false)
    const [logged, changeLogged] = useState(false)

    const handleChange = e => {
        const { id, value } = e.target;
        appendData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    useEffect(() => {
        if (isAuthenticated()) {
            changeLogged(true)
        }
        else (
            changeLogged(false)

        )
    }, [])

    const onFormSubmit = (e) => {
        e.preventDefault()
        changeError(null)
        signUp(formData)
            .then(data => {
                if (Array.isArray(data)) {
                    changeError(data)
                }
                else {
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
                }

            })
            .catch(err => console.log(err))
    }

    const errorBlock = (
        <div className="row">
            <div className="col text-left">
                <div className="alert alert-danger"
                    style={{ display: errorMessage ? 'block' : 'none' }}>
                    {errorMessage}
                </div>
            </div>
        </div>
    )
    if (logged) {
        return <Redirect to={path}></Redirect>
    }
    if (registred) {
        return <SignInForm to={path}></SignInForm>
    }
    return (
        <form className='sign-form' onSubmit={onFormSubmit}>
        <h2>Sign Up</h2>
        {errorBlock}
            <input type="email" id="email" className="form-control"  required placeholder="Email *" onChange={handleChange} />
            <input type="password" id="password" className="form-control"  required placeholder="Password *" onChange={handleChange} />
            <input type="name" id="name" className="form-control" placeholder="Name" onChange={handleChange} />
            <input type="phone" id="phone" className="form-control"  placeholder="Phone" onChange={handleChange} />
            <input type="submit" id='inputSubmit' className="btn btn-dark" value='Sign Up' />
            <button onClick={()=>setRegistred(true)} className="btn btn-light">I am already registred</button>
    </form>
    )

}

export {SignUpForm}
