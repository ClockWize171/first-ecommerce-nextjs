import React, { useContext } from 'react'
import Layout from '@/components/Layout'
import { Store } from '../../utils/store'
import Link from 'next/link';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const { cart: { cartItems } } = state;
  const router = useRouter();

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item })
  }

  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  return (
    <Layout title={"Shopping Cart"}>
      <h1 className='mb-10 text-2xl font-bold'>Shopping Cart</h1>
      {
        cartItems.length === 0 ?
          (
            <div>
              Cart is empty. <Link href='/' className='underline'>Go shopping</Link>
            </div>
          ) : (
            <div className='grid md:grid-cols-4 md:gap-5'>
              <div className='overflow-x-auto md:col-span-3'>
                <table className='min-w-full'>
                  <thead className='border-b'>
                    <tr>
                      <th className='px-5 text-left'>Item</th>
                      <th className='px-5 text-right'>Quantity</th>
                      <th className='px-5 text-right'>Price</th>
                      <th className='px-5'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.slug} className='border-b'>
                        <td>
                          <Link href={`/product/${item.slug}`} className='flex flex-col sm:flex-row items-center'>
                            <Image
                              width={50}
                              height={50}
                              src={item.image}
                              alt={item.name}
                            />&nbsp;
                            {item.name}
                          </Link>
                        </td>
                        <td className='p-5 text-right'>
                          <select
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartHandler(item, e.target.value)
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className='p-5 text-right'>${item.price}</td>
                        <td className='p-5 text-center'>
                          <button onClick={() => removeFromCart(item)}>
                            <XCircleIcon className='w-8 h-8' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='card p-5 mt-5 sm:mt-0 h-[9rem]'>
                <ul>
                  <li>
                    <div className='pb-3'>
                      Total Items: <strong>{cartItems.reduce((a, c) => a + c.quantity, 0)}</strong>
                      <br />
                      Total Price: <strong>${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</strong>
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={
                        () => router.push('login?redirect=/shipping')
                      }
                      className='primary-button w-full'>
                      Check Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )
      }
    </Layout>
  )
}

// eslint-disable-next-line no-undef
export default dynamic(() => Promise.resolve(Cart), { ssr: false }) 