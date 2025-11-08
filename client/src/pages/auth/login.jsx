import CommonForm from '@/components/common/form';
import { LoginformConfig } from '@/config';
import { loginUser } from '@/store/authSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
const initialState={
    email: '',
    password: ''
}
const AuthLogin = () => {
    const [formData, setFormData] = React.useState(initialState);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    function onsubmit(event){
      event.preventDefault();
      dispatch(loginUser(formData)).then(data=>{
        if(data?.payload?.success){
            toast("Logged in successfully");
            navigate('/');
        }
        else{
            toast(data.payload.message);
        }
      })
    };
    return (
        <div className="flex items-center justify-center ">
            <div className="w-full max-w-md">
                <div className="bg-white  p-4 ">
                    {/* Header */}
                    <div className="text-center mb-4 space-y-2">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">Login in to access Braille Bridge</p>
                    </div>

                    {/* Form */}
                    <div>
                        <CommonForm  
                          formControls={LoginformConfig}
                          buttonText={"Sign in"}
                          formData={formData}
                          setFormData={setFormData} 
                          onsubmit={onsubmit}
                        />
                    </div>

                    {/* Footer */}
                    <p className='text-center mt-6 text-gray-600'>
                        Don't have an account?{' '}
                        <Link className='font-semibold text-green-600 hover:text-green-700 hover:underline transition-colors' to={'/auth/signup'}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthLogin






