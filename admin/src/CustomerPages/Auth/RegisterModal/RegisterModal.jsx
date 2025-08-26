import React, { useState } from "react";
import { toast } from "react-hot-toast";

let apiurl = 'http://localhost:4000';

function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Name is required';
    }
    
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
      const response = await fetch(`${apiurl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      
      if (responseData.success) {
        toast.success(responseData.message, { autoClose: 2000 });
        onClose();
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      } else {
        if (responseData.errors) {
          toast.error(responseData.errors, { autoClose: 3000 });
        } else {
          toast.error(responseData.message || 'Registration failed', { autoClose: 3000 });
        }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-medium font-bold text-center font-serif">Sign Up</h1>
                        <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-1">
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700">Name</label>
              <input 
                name="username" 
                value={formData.username} 
                onChange={changeHandler} 
                type='text' 
                placeholder="Your Name"
                className={`w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:border-red-500 rounded-lg ${
                  errors.username ? 'border-red-500' : ''
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700">Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={changeHandler}  
                type='email' 
                placeholder="Email Address"
                className={`w-full px-4 py-2 border border-gray-300 text-base focus:outline-none focus:border-red-500 rounded-lg ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <input 
                name="password" 
                value={formData.password} 
                onChange={changeHandler}  
                type='password' 
                placeholder="Password"
                className={`w-full px-4 py-2 mb-3 border border-gray-300 text-base focus:outline-none focus:border-red-500 rounded-lg ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full py-3 text-white bg-red-500 mt-2 border-none text-base font-medium cursor-pointer rounded-lg hover:bg-red-600 transition-colors"
            >
              Continue
            </button>
          </form>

          <div className="relative flex items-center justify-center my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-2 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button 
            className="w-full py-3 bg-white text-gray-700 border border-gray-300 rounded-lg flex items-center justify-center gap-3 mb-2 hover:bg-gray-50 transition-colors"
          >
            <img 
              src="https://www.google.com/favicon.ico" 
              alt="Google" 
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600 text-sm">
            Already have an Account?{' '}
            <span 
              className="text-red-500 font-semibold cursor-pointer mt-4" 
              onClick={onSwitchToLogin}
            >
              Login Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
