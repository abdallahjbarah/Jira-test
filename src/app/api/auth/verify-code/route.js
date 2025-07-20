import { NextResponse } from 'next/server';
import { VerificationCodeSchema } from '@utils/formsSchemas';

export async function POST(request) {
  try {
    const body = await request.json();
    const { code } = body;

    await VerificationCodeSchema.validate({ code });

    return NextResponse.json({
      message: 'Code verified successfully',
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: error.message || 'Invalid verification code' },
      { status: 400 }
    );
  }
}
