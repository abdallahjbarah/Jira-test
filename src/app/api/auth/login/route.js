import { NextResponse } from 'next/server';
import { SignInSchema } from '@utils/formsSchemas';

export async function POST(request) {
  try {
    const body = await request.json();

    await SignInSchema.validate(body);

    const mockUser = {
      id: '1',
      email: body.email,
      name: 'Test User',
      role: {
        id: 1,
        name: 'user',
      },
      token: 'mock-jwt-token',
    };

    return NextResponse.json(mockUser);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Authentication failed' },
      { status: 401 },
    );
  }
}
