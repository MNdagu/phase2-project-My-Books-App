import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return ( 
        <>
        <nav className="navbar">
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
      <NavLink
        to="/addisbn"
        className="nav-link"
      >
        Add New book
      </NavLink>
      </nav>
        </>
     );
}
 
export default Navbar;