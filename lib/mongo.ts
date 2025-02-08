import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_URI) {
    throw new Error("❌ ERREUR: MONGO_URI manquant ou invalide dans .env.local !");
}

if (!DB_NAME) {
    throw new Error("❌ ERREUR: DB_NAME manquant dans .env.local !");
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToMongo() {
    if (cachedClient && cachedDb) {
        console.log("🔄 Réutilisation de la connexion MongoDB");
        return { client: cachedClient, db: cachedDb };
    }

    try {
        console.log("🔌 Connexion à MongoDB...");
        const client = new MongoClient(MONGO_URI!);
        await client.connect();
        console.log("✅ Connecté à MongoDB !");
        const db = client.db(DB_NAME);

        cachedClient = client;
        cachedDb = db;

        return { client, db };
    } catch (error) {
        console.error("❌ ERREUR: Impossible de se connecter à MongoDB", error);
        throw new Error("Impossible de se connecter à MongoDB");
    }
}
