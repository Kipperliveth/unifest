import {React, useEffect} from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import Home from './Home'
import Shop from './Shop'
import Masterclass from './Masterclass'
import About from './About'
import Contact from './Contact'
import Login from '../App/App-pages/Login'


function AnimatedRoutes() {

    const location = useLocation();

    useEffect(() => {
      // Scroll to the top when the route changes
      window.scrollTo(0, 0);
    }, [location.pathname]);

  return (
    <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />}/>
                    <Route path='/masterclass' element={<Masterclass />}/>
                    <Route path='/about' element={<About />}/>
                    <Route path='/contact' element={<Contact />}/>
                    <Route path='/login' element={<Login />}/>
            </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes