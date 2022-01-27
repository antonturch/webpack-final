import React, {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom';
import './app.scss'

const Products = lazy(() => import('./Products'));
const Order = lazy(() => import('./Order'));

export const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route path="/" element={<div>Main</div>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/order" element={<Order/>}/>
          <Route path="*" element={<Products/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}

