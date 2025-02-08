import { NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";

export async function GET() {
    try {
        const { db } = await connectToMongo();
        const movies = await db.collection("movies").find({}).toArray();

        if (!movies || movies.length === 0) {
            return NextResponse.json({ message: "Aucun film trouvé dans la collection movies" }, { status: 404 });
        }

        return NextResponse.json(movies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
