import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { isLoading } } = useForm();
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const onSubmit = async (data: any) => {
    try {
      if (isRegister) {
        const res = await authService.register(data);
        login(res.data.user, res.data.token);
        navigate('/');
      } else {
        const res = await authService.login(data);
        login(res.data.user, res.data.token);
        navigate('/');
      }
    } catch (error: any) {
      console.error('Auth error:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          🍽️ Hotel Finder
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    {...register('name', { required: isRegister })}
                    placeholder="Your Name"
                    className="input pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    {...register('phone', { required: isRegister })}
                    placeholder="10-digit phone"
                    className="input pl-10"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                {...register('email', { required: true })}
                placeholder="you@example.com"
                className="input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                placeholder="••••••••"
                className="input pl-10"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select {...register('role')} className="input">
                <option value="user">Regular User</option>
                <option value="restaurant_owner">Restaurant Owner</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={isLoading}>
            {isLoading ? 'Loading...' : isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};
