import CommonForm from '@/components/common/form';
import { registerformConfig } from '@/config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const initialState={
    name: '',
    email: '', 
    password: '',
}
const AuthSignUp = () => {
  const [formData,setFormData]=useState(initialState);
  function onSubmit(){

  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new Account</h1>
      </div>
      <CommonForm formControls={registerformConfig} buttonText={'Create Account'}
      formData={formData} setFormData={setFormData} onsubmit={onSubmit}/>
       <p className='mt-2'>Already have an account?..<Link className='font-medium ml-2 text-primary hover :underline' to={'/auth/login'}>Login</Link></p>
    </div>
  )
}

export default AuthSignUp
