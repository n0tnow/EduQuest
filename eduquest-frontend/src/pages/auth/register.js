import React from 'react';
import { useRouter } from 'next/router';
import RegisterForm from '../../components/auth/RegisterForm';

export default function Register() {
  const router = useRouter();

  // Check if user is already logged in
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  return <RegisterForm />;
}