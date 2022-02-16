import React from 'react'
import {Routing} from './router';
import './app.scss'
import {Header} from '@modules/header';


export const App = () => {
  return (
    <div className="app">
      <Header/>
      <Routing/>
    </div>
  )
}





