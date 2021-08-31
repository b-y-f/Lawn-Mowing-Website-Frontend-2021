import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return(
    <>
      <ul>
        <li>
          <Link to="/quotes">quote history</Link>
        </li>
        <li>
          <Link to="/login">logout/in</Link>
        </li>
        <li>
          <Link to="/">new quote</Link>
        </li>
        <li>
          <Link to="/signup">signup</Link>
        </li>
      </ul>
    </>
  )
}