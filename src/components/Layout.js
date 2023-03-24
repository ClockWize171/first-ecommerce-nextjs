import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Store } from '../../utils/store'

const Layout = ({ children, title }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="E-commerce App" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-20 justify-between items-center px-4 shadow-md'>
            <Link href='/' className='text-lg font-bold'>amazona</Link>
            <div>
              <Link href='/cart' className='p-2'>Cart
                {cart.cartItems.length > 0 &&
                  (
                    <span className='ml-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
              </Link>
              <Link href='/login' className='p-2'>Login</Link>
            </div>
          </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>
          {children}
        </main>
        <footer className='flex h-20 py-10 justify-center items-center'>
          <p>Copyright 	&#169; 2023 Amazona</p>
        </footer>
      </div>
    </>
  )
}

export default Layout