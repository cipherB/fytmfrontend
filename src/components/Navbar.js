import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar" >
      <div className='navbar-contain'>
        <h1 className='navbar-logo' >FYTM</h1>
        <div className='navbar-right' >
          <p className='navbar-list-item' >Features</p>
          <p className='navbar-list-item' >About</p>
          <p className='navbar-list-item' >How to Use</p>
          <p className='navbar-list-item' >Github</p>
          <p className='navbar-signup' >Sign Up</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar