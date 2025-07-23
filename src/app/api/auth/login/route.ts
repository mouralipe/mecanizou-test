import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { user, password } = await request.json();

  if (user && password) {
    const response = NextResponse.json({ success: true });

    response.cookies.set('auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  }

  return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
}
