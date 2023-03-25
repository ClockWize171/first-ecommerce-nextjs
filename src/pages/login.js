import Layout from '@/components/Layout'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Login = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const router = useRouter();
  const { redirect } = router.query;

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])


  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      if (result.error) {
        toast.error(result.error)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Layout title={'Login'}>
      <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='my-5 text-2xl'>Login</h1>
        <div className='mb-4'>
          <label htmlFor="email">Email</label>
          <input
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              }
            })}
            type='email'
            className='w-full mt-2'
            id='email'
            autoFocus />
          {errors.email && (<div className='text-red-500'>{errors.email.message}</div>)}
        </div>
        <div className='mb-4'>
          <label htmlFor="password">Password</label>
          <input
            {...register('password', {
              required: 'Please enter password',
            })}
            type='password'
            className='w-full mt-2'
            id='password'
            autoFocus />
          {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}
        </div>
        <div className='mb-4'>
          <button className='primary-button'>
            Login
          </button>
        </div>
        <div className='mb-4'>
          Dont&apos;t have an account? &nbsp;
          <Link href='/register' className='underline'>Register</Link>
        </div>
      </form>
    </Layout>
  )
}

export default Login