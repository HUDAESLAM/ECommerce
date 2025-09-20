"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
import CartContextProvider from '../context/CartContext'
import Navbar from '../Navbar/navbar'
import { Toaster } from 'react-hot-toast'
import Footer from '../Footer/footer'

export default function Provider({children}:{children : ReactNode}) {
  return <>
  <SessionProvider>
          <CartContextProvider>
          <Navbar />
          <div className="container mx-auto py-4 ">
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </div>
          <Footer />
        </CartContextProvider>
        </SessionProvider>
  </>
}
