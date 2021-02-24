import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Base from '../base/base'
import Card from './card'
import {getProducts} from '../helper/coreapicalls'
import {editProducts, setError} from '../../../services/store/actions'
import './shop.sass'

const Shop = ({products, setError,editProducts}) => {


    const loadProcuts = () =>{
        getProducts()
        .then( data=>{
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




    return (
        <Base>
                {<div className="shop">
                {products && products.map((product, index)=>{             
                    return(
                        <Card key={index} product={product}/>
                    )
                })}
                </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
