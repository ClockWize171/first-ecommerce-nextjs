import Layout from '@/components/Layout'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import data from '../../../utils/data';
import { Store } from '../../../utils/store';

const ProductDetail = () => {
  const { state, dispatch } = useContext(Store)
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data.products.find(item => item.slug === slug)
  if (!product) {
    return (
      <Layout>
        Product Not Found!
      </Layout>
    )
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(x => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity++ : 1;

    if (product.countInStock < quantity) {
      alert('Sorry, product is out of stock');
      return;
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    router.push('/cart')
  }

  return (
    <Layout title={product.name}>
      <div className='py-2'>
        <Link href='/' className='underline'>Go back</Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image
            width={400}
            height={400}
            src={product.image}
            alt={product.name}
            className='h-full w-full'
          />
        </div>
        <div>
          <ul className='flex flex-col gap-5 mt-5 sm:mt-0'>
            <li>
              <h1 className='text-2xl font-bold'>{product.name}</h1>
            </li>
            <li>Catagory: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>Rating: {product.rating} of {product.numReviews}</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className='card p-5 mt-5 sm:mt-0'>
            <div className='mb-2 flex justify-between'>
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className='mb-2 flex justify-between'>
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In Stock' : 'Not Available'}</div>
            </div>
            <button className='primary-button w-full' onClick={addToCartHandler}>Add to cart</button>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default ProductDetail