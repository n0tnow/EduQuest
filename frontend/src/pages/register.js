
import RegisterForm from '../components/auth/RegisterForm';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, []);

  return <RegisterForm />;
}