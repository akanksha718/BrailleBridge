import CommonForm from '@/components/common/form';
import { registerformConfig } from '@/config';
import { registerUser } from '@/store/authSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
const initialState = {
  name: '',
  email: '',
  password: '',
}
const AuthSignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onsubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data.payload.message);
        navigate("/auth/login");
      }
      else {
        toast(data.payload.message);
        varient: "distructive";
      };
    });
  };
  return (
     <div className="flex items-center justify-center ">
            <div className="w-full max-w-md">
                <div className="bg-white  p-4 ">
                    {/* Header */}
                    <div className="text-center mb-4 space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text">
                            Create Account
                        </h1>
                        <p className="text-gray-600">Join Braille Bridge Today</p>
                    </div>

                    {/* Form */}
                    <div>
                        <CommonForm  
                          formControls={registerformConfig}
                          buttonText={"Create Account"}
                          formData={formData}
                          setFormData={setFormData} 
                          onsubmit={onsubmit}
                        />
                    </div>

                    {/* Footer */}
                    <p className='text-center mt-6 text-gray-600'>
                        Already have an account?{' '}
                        <Link className='font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors' to={'/auth/login'}>
                            Login In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default AuthSignUp
