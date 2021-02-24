import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"


const CartForm = ({ userData, products, history,children }) => {

    const [errorMessage, changeError] = useState(null)
    const [orderData, appendData] = useState({
        email: '',
        phone: '',
        address: ''
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
        const { id, value } = e.target;
        appendData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault()
        changeError(null)
        orderData.products = products.map(product=> product.name)
        orderData.amount = products.reduce((a,b)=> a+ parseInt(b.price),0)
        orderData.token = JSON.parse(localStorage.webToken)
        history.push({
            pathname: '/order/',
            state: {orderData: orderData}
        })
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

    return(
        <>
        {children}
        <form onSubmit={onFormSubmit} className='sign-form'>
        <h2>Delivery Details</h2>
                {errorBlock}
                <input id = 'email' defaultValue={email}  type="email" className="form-control"  required placeholder="Email" disabled onChange={handleChange} />
                <input id = 'name' defaultValue={name}  type="name" className="form-control"  required placeholder="Name" disabled onChange={handleChange} />
                <input id = 'phone' defaultValue={phone} type="phone" className="form-control"  required placeholder="Phone" disabled onChange={handleChange} />
                <input id = 'address' type="address" className="form-control"  required placeholder="Address" onChange={handleChange} />
                <input type="submit" id='inputSubmit' className="btn btn-dark" value='Checkout' />
            </form>
        </>
    )
}

export default withRouter(CartForm)