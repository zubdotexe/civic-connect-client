import React from 'react'
import Navbar from '../pages/shared/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../pages/shared/Footer/Footer'

export default function RootLayout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
