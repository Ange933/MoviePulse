import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";

export async function GET(req: Request) {
    const { db } = await connectToMongo();
    const userId = req.headers.get("X-User-Id");

    if (!userId) {
        return NextResponse.json({ error: "Aucun UUID fourni" }, { status: 401 });
    }

    console.log("Récupération des favoris pour userId :", userId);

    const favorites = await db.collection("favorites").find({ userId }).toArray();
    return NextResponse.json(favorites, { status: 200 });
}

export async function POST(req: Request) {
    const { db } = await connectToMongo();
    const userId = req.headers.get("X-User-Id");

    if (!userId) {
        return NextResponse.json({ error: "Not authenticated (no userId)" }, { status: 401 });
    }

    const { movieId, title, poster_path } = await req.json();
    if (!movieId || !title || !poster_path) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await db.collection("favorites").insertOne({ userId, movieId, title, poster_path });
    return NextResponse.json({ message: "Added to favorites" }, { status: 201 });
}

export async function DELETE(req: Request) {
    const { db } = await connectToMongo();
    const userId = req.headers.get("X-User-Id");

    if (!userId) {
        return NextResponse.json({ error: "Not authenticated (no userId)" }, { status: 401 });
    }

    const { movieId } = await req.json();
    if (!movieId) {
        return NextResponse.json({ error: "Missing movieId" }, { status: 400 });
    }

    await db.collection("favorites").deleteOne({ userId, movieId });
    return NextResponse.json({ message: "Removed from favorites" }, { status: 200 });
}
