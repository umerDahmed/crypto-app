import React from 'react'
import Header from './components/Header';
import './App.css'
import Homepage from './pages/Homepage' ;
import Coinpage from './pages/Coinpage';
import { Route, Routes } from 'react-router-dom';
import {makeStyles } from '@material-ui/core';
import CryptoContext from './CryptoContext';
const App = () => {

  //styking a react app through material goes like this.
  // first make a class named "useStyles" like given 
  // introduce different classes in that class for different purposes
  // initialize an object with that class

  const useStyles = makeStyles(()=>({
    App:{
    backgroundColor: "#14161a",
    color: 'white',
    minHeight:"100vh"
    }
  }))
  //initializing object 
  const obj = useStyles() ;
  // done with the styling
  return (
    <div className={obj.App}>
        <Header/>
        <Routes> 
        <Route path='/' Component={Homepage} exact/>
        <Route path='/coins/:id' Component={Coinpage} exact/>
         </Routes>

    </div>
  )    
}

export default App