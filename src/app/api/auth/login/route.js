import { NextResponse } from "next/server";
import { SignInSchema } from "@utils/formsSchemas";

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate the request body against the schema
        await SignInSchema.validate(body);

        // TODO: Replace with actual authentication logic
        // This is a mock response for demonstration
        const mockUser = {
            id: "1",
            email: body.email,
            name: "Test User",
            role: {
                id: 1,
                name: "user"
            },
            token: "mock-jwt-token"
        };

        return NextResponse.json(mockUser);
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Authentication failed" },
            { status: 401 }
        );
    }
} 