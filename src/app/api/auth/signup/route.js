import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phoneNumber, password } = body;

        // Here you would typically:
        // 1. Validate the input
        // 2. Check if user already exists
        // 3. Hash the password
        // 4. Create user in database
        // For now, we'll just simulate a successful response

        // Simulate some processing time
        await new Promise(resolve => setTimeout(resolve, 500));

        // Return success response
        return NextResponse.json(
            {
                message: "Account created successfully",
                user: { firstName, lastName, email }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: "Failed to create account" },
            { status: 500 }
        );
    }
} 