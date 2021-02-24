import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Base from '../base/base'
import { orderPayment } from '../helper/orderHelper'
import { setError } from '../../../services/store/actions'
import './order.sass'
function OrderSucess({match, history, setError}) {
    const id = match.params.id

    useEffect(()=>{
        orderPayment(id)
        .then(()=>
            setTimeout(()=>{
                history.push('/user/dashboard/')
            },5000)
        )
        .catch(()=>setError(true))
    })

    return (
        <Base>
        <div className="thanks">
        <h2>Thanks for the order!<br/>You will be redirected to your profile.</h2>    
        </div>     
        </Base>
    )
}
const mapStateToProps = () => ({})

const mapDispatchToProps = {
    setError
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderSucess)
