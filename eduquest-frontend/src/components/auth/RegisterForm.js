import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from '../../contexts/Web3Context';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    educationLevel: 'primary',
    connectWallet: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registrationStep, setRegistrationStep] = useState(1);
  
  const router = useRouter();
  const { connectWallet } = useWeb3();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          education_level: formData.educationLevel
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        
        if (formData.connectWallet) {
          setRegistrationStep(2);
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnection = async () => {
    try {
      setIsLoading(true);
      await connectWallet();
      router.push('/dashboard');
    } catch (error) {
      setError('Wallet connection failed. Please try again later.');
      console.error('Wallet connection error:', error);
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationStep === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Wallet Connection</h2>
          
          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="text-center text-gray-300 mb-6">
            <p>Your account has been successfully created!</p>
            <p className="mt-2">Now you can connect your crypto wallet to get started.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleWalletConnection}
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isLoading ? 'Connecting...' : 'Connect MetaMask'}
            </button>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 focus:outline-none"
            >
              Connect Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Create Account</h2>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="educationLevel">
              Education Level
            </label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="primary">Primary School</option>
              <option value="middle">Middle School</option>
              <option value="high">High School</option>
              <option value="university">University</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="connectWallet"
              name="connectWallet"
              type="checkbox"
              checked={formData.connectWallet}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded"
            />
            <label className="ml-2 block text-gray-300" htmlFor="connectWallet">
              I want to connect my crypto wallet now
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">Already have an account?</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="text-purple-400 hover:text-purple-300 mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
