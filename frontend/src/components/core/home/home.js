import React, {useEffect} from 'react'
import {connect } from 'react-redux'
import Base from '../base/base'
import {getProducts} from '../helper/coreapicalls'
import {editProducts, setError} from '../../../services/store/actions'
import { Link } from 'react-router-dom'
import './home.sass'

const Home = ({products, setError,editProducts}) => {

    const loadProcuts = () =>{
        getProducts()
        .then(data=>{
            if(data.error){
                setError(true)
            }
            else{                
                editProducts(data)
            }

        })
        .catch(()=>setError(true))
    }

    useEffect(()=>{
        loadProcuts()
    },[])


    const Card = ({id,name,image}) =>{
        return(
        <div className="product-image">
            <h3>{name}</h3>
            <Link to={`/shop/${id}`}>
            <img src={image} alt={name}/>
            </Link>
        </div>
        )
    }




    return (
        <Base>
            <div className="home-preview">
                {products && products.slice(0,4).map((product,index)=>{
                    const {id, name, image} = product
                    return (
                        <Card key={index} id = {id} name = {name} image= {image} />
                    )
                })}
                <Link to={'/shop/'} className="btn btn-black">SHOP NOW</Link>
            </div>
        </Base>
    )
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = {
    editProducts,
    setError    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
