import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setError } from '../../../services/store/actions'
import Base from '../base/base'
import { createOrder } from '../helper/orderHelper'
import './order.sass'
function Order({history, setError}) {

    const { amount, products, address,token} = history.location.state.orderData

    const orderData = {
        amount:amount,
        products: products,
        address:address
    }

    const onSubmit = () => {
        createOrder(orderData,token)
        .then(res =>{
            window.location.replace(res.payment_url)            
            localStorage.cart=[]
        })
        .catch(()=>setError(true))
    }

    if (!history.location.state.orderData){
        return(
            <Redirect to='/'/>
        )
    }

    
    return (
        <Base>
        <div className="order">
        <h2>Your order</h2>
             <div  className="order-card" >                  
                            <p>Products</p>
                            <ul>
                                {
                                    products.map((product,index) =>{
                                        return <li key={index}>{product}</li>
                                    })
                                    
                                }
                            </ul>
                        <p>Address: {address}</p>   
                        <hr/>
                        <p>Total amount: ${amount}</p>
                        <button onClick={onSubmit} className="btn btn-dark">Continue to payment</button>                    
                </div>
                </div>
        </Base>
    )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    setError,
}

export default connect(mapStateToProps,mapDispatchToProps)(Order)
