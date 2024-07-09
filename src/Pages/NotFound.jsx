import React, {useEffect} from 'react'
import { NavLink } from 'react-router-dom';



function NotFound() {
  useEffect(() => {
    document.title = "Not Found";
  }, []);


  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NavLink to="/" className="home-link">Go to Home</NavLink>
    </div>
  )
}

export default NotFound