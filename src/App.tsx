import React from 'react'
import {Header} from '@Modules/Header';
import {Routing} from './Router';
import './app.scss'


export const App = () => {
  return (
    <div className="app">
      <Header/>
      <Routing/>
    </div>
  )
}





