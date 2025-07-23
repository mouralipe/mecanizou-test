import { authService } from '@/services/auth';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { login, logout } = authService();

  const router = useRouter();

  const handleLogin = async (user: string, password: string) => {
    const response = await login(user, password);
    if (response.ok) {
      router.push('/produtos');
    }
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.ok) {
      router.push('/login');
    }
  };

  return {
    handleLogin,
    handleLogout,
  };
};
