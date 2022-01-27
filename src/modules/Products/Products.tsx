import React from 'react'
import {makeLogger} from 'ts-loader/dist/logger';
import {useLocation} from 'react-router-dom';

const Products = () => {
  const location = useLocation()
  console.log('Products')

  console.log(location.pathname)
  return (
    <div>Products</div>
  )
}

export default Products
