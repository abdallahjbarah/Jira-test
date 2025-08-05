import { NextResponse } from 'next/server';
import { ForgetPasswordEmailSchema } from '@utils/formsSchemas';

export async function POST(request) {
  try {
    const body = await request.json();

    await ForgetPasswordEmailSchema.validate(body);

    return NextResponse.json({
      message: 'Password reset link sent successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Failed to send reset link' },
      { status: 400 },
    );
  }
}
