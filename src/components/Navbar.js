import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return ( 
        <>
        <nav>
      <NavLink
        to="/"
        className="nav-link"
      >
        My Book Collection
      </NavLink>
      <NavLink
        to="/readinglist"
        className="nav-link"
      >
        My Reading List
      </NavLink>
      </nav>
        </>
     );
}
 
export default Navbar;