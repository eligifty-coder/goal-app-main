import React from 'react'
import Header from '../components/Header'
import {Routes} from 'react-router-dom'

const LandingPage = (props) => {
   return (
         <div className="container">
         <Header />
         <Routes>
            {props.children}
         </Routes>
         </div>
   )
}

export default LandingPage