import React from 'react'
import {useLocation} from 'react-router-dom';

const Order = () => {
  const location = useLocation()
  console.log('Order')

  console.log(location.pathname)
  return (
    <div>Order</div>
  )
}

export default Order
