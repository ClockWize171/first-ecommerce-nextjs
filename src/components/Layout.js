import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Layout = ({ children, title }) => {
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
              <Link href='/cart' className='p-2'>Cart</Link>
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