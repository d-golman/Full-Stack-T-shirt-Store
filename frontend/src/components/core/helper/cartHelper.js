export const addItemToCart = (item,size) => {
    const cart = localStorage.cart ? JSON.parse(localStorage.cart) : []
    cart.push({
        ...item,
        name: [item.name,size] 
    })
    localStorage.setItem('cart', JSON.stringify(cart))
}
export const removeItemFromCart = (item) => {
    const cart = localStorage.cart ? JSON.parse(localStorage.cart) : []
    const index = cart.indexOf(cart.filter(element => element.name[0] === item.name[0] && element.name[1] === item.name[1])[0])
    if(index !== -1){
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart))
    }
}

export const loadCart = () =>{
    const cart = localStorage.cart ? JSON.parse(localStorage.cart) : []
    return cart
}
