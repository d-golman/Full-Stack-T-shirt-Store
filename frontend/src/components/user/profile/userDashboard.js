import React, { useEffect,useState } from 'react'
import Base from '../../core/base/base'
import { getUserData } from '../helper/userapicalls'
import { Dashoard } from './userDataForm'
import './profile.sass'
const UserDashboard = () => {

    const [userData, setUserData] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            await setUserData(await getUserData())
        }
        fetchData()
    }, [])


    const Orders = ({ orders }) => {
        const orderList = () => {
            return [].concat(orders).reverse().map((order, index)=>{
                const {products, total_amount, address, paid, link} = order
                return (
                <div key={index} className="order-card" >        
                        <p>Ordered products:</p> 
                        <ul>
                                {
                                    products.map((product,index) =>{
                                        return <li key={index}>{product}</li>
                                    })
                                    
                                }
                            </ul>
                        <p>Address: {address}</p>   
                        <hr/>
                        <p>Total amount: ${total_amount}</p>
                        {paid ? 
                        <p className='status'>Order paid</p> :
                        <a href={link} target='blank' className="btn btn-dark status">Please complete the payment</a>
                        }
                </div>
            )
                })
        }
        return (
            <>
            <h2>Privous orders</h2>
            {orderList()}
            </>
        )
    }

    return (
        <Base>
            <div className="profile">
                <div className="profile-orders">                    
                    {userData ? <Orders orders={userData.orders} /> : <></>}
                </div>
                <div className="profile-data">
                    {userData ? <Dashoard userData={userData} /> : <></>}
                </div>
            </div>
        </Base>
    )
}




export default UserDashboard
