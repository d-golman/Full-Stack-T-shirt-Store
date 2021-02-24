import React, {useState, useEffect} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from '../helper/cartHelper'


const Card = ({product}) => {

  const [inCart, changeInCart] = useState(false)
  let [size, setSize] = useState(null)

  const chekIfInCart = (product, size) => {
    if (product && localStorage.cart && JSON.parse(localStorage.cart).filter(item => item.id === product.id && item.name[1] === size).length > 0) {
        return true
    }
    else {
        return false
    }
}

  useEffect(()=>{
    setSize(product.sizes[0])
    changeInCart(chekIfInCart(product,product.sizes[0]))
  },[product])

  const addToCart = () =>{
      addItemToCart(product,size)
      changeInCart(chekIfInCart(product,size))
    }
  

  const removeFromCart = () =>{
      removeItemFromCart({name:[product.name, size]})
      changeInCart(chekIfInCart(product,size))
    }
  

  

  const showAddToCart = () =>{
    if (product.sizes.length > 0 && product.is_active ){
    return(
        <button
        onClick={addToCart}
        className="btn btn-dark"
      >
        <i className="fas fa-shopping-cart" aria-hidden="true"></i>
      </button>      
    )
  }
    else{
      return(
        <p className="btn btn-light" style={{'cursor':'default'}}>Coming soon</p>
      )
    }
  }

  const showRemoveFromCart = () =>{
    return(
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
      changeInCart(chekIfInCart(product,e.target.value))

  }

    
  const { id, name, price, image, sizes } = product
  return(
    <div className="shop-card">
        <div className="shop-card-image-block">
          <Link  to={`/shop/${id}/`}>
            <img src={image} alt={name} />
        </Link>
        </div>
        <p className="shop-card-header">{name}</p>
        <p className='shop-card-price'>${price}</p>
        <select className='shop-card-selector' onChange={onSelect}>
            {sizes.length > 0 ? sizes.map((size,index)=>(<option key={index} value={size} >{size}</option>))
            : <option disabled>Sorry nothing left :(</option>
            }
        </select>
        {showAddToCart()}
        {showRemoveFromCart()}
    </div>
  )
}

export default withRouter(Card)