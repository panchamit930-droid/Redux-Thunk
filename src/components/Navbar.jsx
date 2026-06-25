import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <ul>
        <li><Link to={"/"} style={{textDecoration:'none', color:'white'}}>Tasks</Link></li>
        <li><Link to={"/createtask"} style={{textDecoration:'none', color:'white'}}>Create task</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
