import React, { useState, useEffect } from 'react'
import { getUserData } from '../../user/helper/userapicalls'
import { SignInForm } from '../../user/signin/signin'
import Base from '../base/base'
import { removeItemFromCart } from '../helper/cartHelper'
import CartForm from './cartForm'
import './cart.sass'
import { connect } from 'react-redux'
import {setError} from '../../../services/store/actions'

function Cart({setError}) {

    const [products, setproducts] = useState([])
    const [userData, setUserData] = useState(null)
    const [price, setPrice] = useState(0)

    useEffect( () => {
        setproducts(loadProducts())
        const fetchData = async () => {
            setUserData(
                await getUserData()
                .catch(()=>setError(true)))
        }
        fetchData()       
        
    },
        [])

    const loadProducts = () =>{
        if (localStorage.cart){
            const products = JSON.parse(localStorage.cart)
            setPrice(()=>{
                return products.reduce((a,b)=> a+ parseInt(b.price),0)
            })
            return products
        }
        else return []
    } 

    const Products = () => {
        if (products.length > 0) {
            return products.map((product, id) => {
                return (
                    <Card key={id} product={product} />
                )
            })
        }
        else return (<></>)
    }

    const Calculation = () =>{
        const amount = products.length
        return(
            <div  className="calculation" >
                    <ul>                        
                        <li>Total products: {amount}</li>
                        <li>Total price: ${price}</li>                     
                    </ul>                     
                </div>
        ) 
    }

    const Card = ({ product, id }) => {
        const { name, price, image } = product
        const [productName, size] = name
        return (
            <div key={id} className="cart-card">
                <div className="cart-card-image">
                    <img
                        src={image}
                        alt={name}
                    />
                </div>
                <div className="cart-card-body" >
                    <h3 className="card-title">{productName} ({size})</h3>
                    <p className="card-price">
                        ${price}
                    </p>
                    <button onClick={() => {
                        removeItemFromCart(product)
                        setproducts(loadProducts())
                    }} className="btn btn-dark">Remove from Cart</button>
                </div>
            </div>
        )
    }


    return (
        <Base>
        <section className="cart">
                <div className="cart-data">
                    <h2>Cart</h2>
                    <Products/>
                    <Calculation/>
                </div>
                <div className="user-data">         
                    {userData ?       
                     <CartForm userData={userData} products={products}/>
                    :
                     <SignInForm path={'/cart/'}/>
                    }
                </div>
                </section>
        </Base>
    )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
    setError,
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
