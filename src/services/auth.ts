export function authService() {
  async function login(user: string, password: string) {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, password }),
    });

    return response;
  }

  async function logout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    return response;
  }

  return {
    login,
    logout,
  };
}
