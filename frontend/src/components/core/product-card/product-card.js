import Base from "../base/base";
import { addItemToCart, removeItemFromCart } from '../helper/cartHelper'
import React, { useEffect, useState } from 'react'
import { getProduct } from "../helper/coreapicalls";
import './product-card.sass'
import SimilarProducts from "./similar-products";
import { setError } from "../../../services/store/actions";
import { connect } from "react-redux";

function ProductCard({ match, setError }) {
    const id = match.params.id

    const [product, setProduct] = useState(null)

    useEffect(() => {
        getProduct(id)
            .then(res => {
                setProduct(res)
            })
            .catch(()=> setError(true))
    }, [id])


    return (
        <Base>
            {product && <Card product={product} />}
        </Base>
    )
}



const Card = ({ product }) => {
    let [size, setSize] = useState(null)
    const [inCart, changeInCart] = useState(false)

    const chekIfInCart = (product, size) => {
        if (product && localStorage.cart && JSON.parse(localStorage.cart).filter(item => item.id === product.id && item.name[1] === size).length > 0) {
            return true
        }
        else {
            return false
        }
    }


    useEffect(() => {
        setSize(product.sizes[0])
        changeInCart(chekIfInCart(product, product.sizes[0]))
    }, [product])


    const addToCart = () => {
        addItemToCart(product, size)
        changeInCart(chekIfInCart(product, size))
    }


    const removeFromCart = () => {
        removeItemFromCart({ name: [product.name, size] })
        changeInCart(chekIfInCart(product, size))
    }


    const showAddToCart = () => {
        if (product.sizes.length > 0 && product.is_active) {
            return (
                <button
                    onClick={addToCart}
                    className="btn btn-dark"
                >
                    <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                </button>
            )
        }
        else {
            return (
                <p className="btn btn-light" style={{ 'cursor': 'default' }}>Coming soon</p>
            )
        }
    }

    const showRemoveFromCart = () => {
        return (
            inCart &&
            <button
                onClick={removeFromCart}
                className="btn btn-light"
            >
                Remove
  </button>
        )
    }

    const onSelect = e => {
        setSize(e.target.value)
        changeInCart(chekIfInCart(product, e.target.value))

    }


    const { name, description, price, image, sizes } = product
    return (
        <div className="product-page">
            <div className="product-card">
                <div className="product-card-image-block">
                    <img src={image} alt={name} />
                </div>
                <div className='product-card-data'>
                    <h1 className="product-card-header">{name}</h1>
                    <p className={'product-card-price'}>{price} $</p>
                    <p className="product-card-description">{description}</p>
                    <select className='product-card-selector' onChange={onSelect}>
                        {sizes && sizes.length > 0 ? sizes.map((size, index) => (<option key={index} value={size} >{size}</option>))
                            : <option disabled>Sorry nothing left :(</option>
                        }
                    </select>
                    {showAddToCart()}
                    {showRemoveFromCart()}
                </div>
            </div>
            <SimilarProducts category={product.category} id={product.id} />
        </div>
    )

}
const mapStateToProps = () => ({})

const mapDispatchToProps = {
    setError,
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductCard)
