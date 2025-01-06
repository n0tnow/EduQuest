import React from 'react';
import { useRouter } from 'next/router';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  const router = useRouter();

  // Check if user is already logged in
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  return <LoginForm />;
}