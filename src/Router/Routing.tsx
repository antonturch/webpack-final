import React, {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {ROUTE_PATHS} from '../consts/routePaths';
import {Registration} from '@Modules/Registration';
import {Login} from '@Modules/Login';


const Products = lazy(() => import('@Modules/Products'));
const Orders = lazy(() => import('@Modules/Orders'));

export const Routing = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path={ROUTE_PATHS.SIGNUP} element={<Registration/>}/>
        <Route path={ROUTE_PATHS.SIGNIN} element={<Login/>}/>
        <Route path={ROUTE_PATHS.PRODUCTS} element={<Products/>}/>
        <Route path={ROUTE_PATHS.ORDERS} element={<Orders/>}/>
        <Route path="*" element={<Registration/>}/>
      </Routes>
    </Suspense>
  )
}