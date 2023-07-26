"use client"
import React from 'react'
import {signOut} from "next-auth/react"
const Nav = () => {
  return (
    <div className=''>
      <button onClick={()=>signOut()} className='p-5 mx-10 mt-6'>Sign Out</button>
    </div>
  )
}

export default Nav
