import { Menu } from '@headlessui/react';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Store } from '../../utils/store'
import DropdownLink from './DropdownLink';

const Layout = ({ children, title }) => {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cartItems])


  const handleLogout = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' })
    signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="E-commerce App" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <ToastContainer position='bottom-center' limit={1} />
      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <nav className='flex h-20 justify-between items-center px-4 shadow-md'>
            <Link href='/' className='text-lg font-bold'>amazona</Link>
            <div>
              <Link href='/cart' className='p-2'>Cart
                {cartItemsCount > 0 &&
                  (
                    <span className='ml-2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                      {cartItemsCount}
                    </span>
                  )}
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as='div' className='relative inline-block'>
                  <Menu.Button className='text-blue-600'>
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className='absolute right-0 w-56 origin-top bg-white shadow-lg'>
                    <Menu.Item>
                      <DropdownLink className='dropdown-link' href='/profile'>
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink className='dropdown-link' href='/order-history'>
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink className='dropdown-link' href='#' onClick={handleLogout}>
                        Logout
                      </DropdownLink>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className='p-2'>
                  Login
                </Link>
              )}
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