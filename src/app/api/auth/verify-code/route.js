import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();
        const { code } = body;

        if (!code || code.length !== 4) {
            return NextResponse.json(
                { message: "Invalid verification code" },
                { status: 400 }
            );
        }

        // TODO: Replace with actual verification logic
        // This is a mock response for demonstration
        return NextResponse.json({
            message: "Code verified successfully"
        });
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Invalid verification code" },
            { status: 400 }
        );
    }
} 