import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductItems = ({ product, addToCartHandler }) => {
  return (
    <div className='card'>
      <Link href={`/product/${product.slug}`}>
        <Image
          width={400}
          height={400}
          src={product.image}
          alt={product.name}
          className='rounded shadow w-full h-[20rem]' />
      </Link>
      <div className='flex flex-col items-center justify-center p-5'>
        <Link href={`/product/${product.slug}`}>
          <h2 className='text-lg'>
            {product.name}
          </h2>
        </Link>
        <p className='mb-2'>
          {product.brand}
        </p>
        <p>${product.price}</p>
        <button
          className='primary-button mt-2'
          type='button'
          onClick={() => addToCartHandler(product)}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductItems