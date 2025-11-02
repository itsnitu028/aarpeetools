import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../../../api";
import { MyContext } from "../../../App";
import { useContext } from "react";

let apiurl = 'http://localhost:4000';

function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const context = useContext(MyContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const response = await fetch(`${apiurl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('name', responseData.user.name);

        context.setUser(responseData.user);
        
        toast.success(responseData.message, { autoClose: 2000 });
        onClose();
        
        // Reset form
        setFormData({
          email: '',
          password: ''
        });
        
        
        navigate('/home');
      } else {
        toast.error(responseData.message || 'Login failed', { autoClose: 3000 });
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.', { autoClose: 3000 });
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

 

  const responseGoogle = async (authResult) => {
    try {
      // console.log("Google Auth Response:", authResult);
      if(authResult['code']) {
        const result =await googleAuth(authResult['code']);
        const {email, name, picture}= result.data.user;
        const token = result.data.token;
        const obj = {email, name, picture, token};
localStorage.setItem('user-info', JSON.stringify(obj));
context.setUser(obj)
        // console.log('result.data.user', result.data.user);
        // console.log(token);
        toast.success("Logged in successfully ");
        onClose();
      }

    } catch (error) {
      console.log("Google Login Error:", error);
      toast.error("Google login failed ");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Login</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={changeHandler}  
                type='email' 
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                name="password" 
                value={formData.password} 
                onChange={changeHandler}  
                type='password' 
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-3 text-white bg-red-500 border-none text-base font-medium cursor-pointer rounded-lg hover:bg-red-600 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="relative flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-2 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button 
              onClick={() => googleLogin()}
            className="w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center justify-center gap-3 mb-4 hover:bg-gray-50 transition-colors"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <span 
              className="text-red-500 font-semibold cursor-pointer hover:text-red-600" 
              onClick={onSwitchToRegister}
            >
              Sign Up Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;

