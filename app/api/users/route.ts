import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";

export async function POST(req: Request) {
    try {
        const { db } = await connectToMongo();
        const { userId, email } = await req.json();

        if (!userId || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingUser = await db.collection("users").findOne({ userId });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 200 });
        }

        await db.collection("users").insertOne({
            userId,
            email,
            createdAt: new Date(),
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
