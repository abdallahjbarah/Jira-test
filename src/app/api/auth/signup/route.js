import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, password } = body;

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: { firstName, lastName, email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Failed to create account' },
      { status: 500 },
    );
  }
}
