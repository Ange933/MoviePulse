const { MongoClient } = require("mongodb");
const fs = require("fs");

// ✅ Remplace <db_password> par ton vrai mot de passe MongoDB
const MONGO_URI = "mongodb+srv://moviepulse:ynov@cluster0.csd8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "myDatabase"; // Remplace par le nom de ta base MongoDB
const COLLECTION_NAME = "movies"; // Remplace par le nom de la collection à exporter

async function exportMongoDB() {
    try {
        const client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log("✅ Connecté à MongoDB");

        const db = client.db(DB_NAME);
        const collection = db.collection(COLLECTION_NAME);

        const data = await collection.find({}).toArray(); // Récupère toutes les données

        fs.writeFileSync("data.json", JSON.stringify(data, null, 2)); // Sauvegarde en JSON
        console.log("✅ Données exportées dans data.json");

        await client.close();
    } catch (error) {
        console.error("❌ Erreur lors de la connexion à MongoDB :", error);
    }
}

exportMongoDB();
