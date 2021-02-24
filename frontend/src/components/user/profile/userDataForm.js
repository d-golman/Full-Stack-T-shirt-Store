import React, { useEffect, useState } from "react"
import { putUserData } from "../helper/userapicalls"


export const Dashoard = ({ userData }) => {

    const [errorMessage, changeError] = useState(null)
    const [formData, appendData] = useState({
        email: '',
        password: '',
        name: '',
        phone: ''
    })

    useEffect(() => {
        appendData(prevData => {
            for (const key in prevData) {
                if (userData[key]) {
                    prevData[key] = userData[key]
                }
            }
            return prevData
        })
    }, [userData])

    const handleChange = e => {
        const { name, value } = e.target;
        appendData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault()
        changeError(null)
        putUserData(userData.id, formData)
            .then(data => {
                if (data && Array.isArray(data)) {
                    changeError(data[0])
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

    const { name, email, phone } = userData
    return (
        <form onSubmit={onFormSubmit} className='sign-form'>
        <h2>User data</h2>
            {errorBlock}
            <input defaultValue={email} type="email" id="email" className="form-control"  required placeholder="Email *" onChange={handleChange} />
            <input type="password" id="password" className="form-control"  required placeholder="Password *" onChange={handleChange} />
            <input defaultValue={name} type="name" id="name" className="form-control" placeholder="Name" onChange={handleChange} />
            <input defaultValue={phone} type="phone" id="phone" className="form-control"  placeholder="Phone" onChange={handleChange} />
            <input type="submit" id='inputSubmit' className="btn btn-dark" value='Change Data' />
        </form>
    )
}