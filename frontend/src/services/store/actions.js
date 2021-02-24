export const editProducts = (products) =>{
    return {
        type: 'EDIT_PRODUCTS',
        payload: products
    }
}
export const setError = (value) =>{
    return {
        type: 'SET_ERROR',
        payload: value
    }
}