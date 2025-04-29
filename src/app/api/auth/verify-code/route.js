import { NextResponse } from "next/server";
import { VerificationCodeSchema } from "@utils/formsSchemas";

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate the request body against the schema
        await VerificationCodeSchema.validate(body);

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