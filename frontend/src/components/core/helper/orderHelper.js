import { API } from "../../../services/backend";

const createOrder = (orderData, token) => {
    console.log(orderData)
    const data = JSON.stringify(orderData) 
    console.log(data)
    return fetch(`${API}order/add/${token}/`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: data
    })
        .then(res => res.json())
        .then(res => console.log(res))
}

const orderPayment = (id) => {
    const formData = new FormData()
    formData.append('paid', true)
    return fetch(`${API}order/${id}/`, {
        method: 'PUT',
        body: formData
    })
        .then(res => res.json())
}


export { orderPayment, createOrder }