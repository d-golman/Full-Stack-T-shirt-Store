import {API} from '../../../services/backend.js'

export const getProducts = () =>{
    return fetch(`${API}product/`, {method:'GET'})
    .then(res => res.json())
    .then(res=>res.map(product => ({...product, sizes:product.sizes.filter(item => item)})))
}

export const getProduct = (id) =>{
    return fetch(`${API}product/${id}/`)
    .then(res=> res.json())
    .then(res=>({...res, sizes:res.sizes.filter(item => item)}))
    }