"use client"
import React from 'react'
import Link from "next/link"
import { signIn,signOut} from "next-auth/react"
const RegisterAndLogin = () => {
  return (
    <div className="flex justify-between">
    <button className='bg-blue-600 rounded-sm p-4 mx-4 mt-6' onClick={()=>signIn()}>SignIn</button>
    <Link href="/lab-planner">Lab Planner</Link>
    <Link href="/dashboard">Dashboard</Link>
    <button className='bg-blue-600 rounded-sm p-4 mx-4 mt-6' onClick={()=>signOut()}>SignOut</button>
    </div>
  )
}

export default RegisterAndLogin
