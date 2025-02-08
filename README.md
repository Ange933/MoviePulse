🎬 Plateforme de films - MongoDB & Supabase

📌 Description du projet

Ce projet est une plateforme permettant aux utilisateurs de parcourir un catalogue de films, d'ajouter des films à leurs favoris et à leur panier, puis de finaliser un paiement fictif.

🚀 Technologies utilisées

MongoDB : Stockage des films, favoris et utilisateurs.

Supabase : Gestion de l'authentification des utilisateurs.

NestJS : Backend de l'API pour interagir avec MongoDB.

Next.js (TypeScript) : Frontend de l'application.

Tailwind CSS : Style de l'interface utilisateur.

📁 Installation et configuration

1️⃣ Cloner le projet

git clone https://github.com/Ange933/MoviePulse.git
cd nom-du-projet

2️⃣ Installer les dépendances

yarn install  # ou npm install

3️⃣ Configurer les variables d'environnement

Créer un fichier .env.local à la racine du projet et y ajouter :

# MongoDB
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/
DB_NAME=nom-de-ta-bdd

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=ta_cle_anon

4️⃣ Lancer le serveur

yarn dev  # ou npm run dev

L'application sera disponible sur http://localhost:3000.

🔥 API - Endpoints

📌 Films (/api/movies)

GET /api/movies → Récupère tous les films depuis MongoDB.

📌 Favoris (/api/favorites)

GET /api/favorites → Récupère les favoris d'un utilisateur en fonction de son UUID.

POST /api/favorites → Ajoute un film aux favoris d'un utilisateur.

DELETE /api/favorites → Supprime un film des favoris d'un utilisateur.

🛠 Fonctionnalités

✔ Authentification avec Supabase
✔ Stockage des utilisateurs, favoris et films avec MongoDB
✔ Ajout/Suppression de films aux favoris
✔ Ajout au panier et calcul du total
✔ Paiement fictif

📜 License

Ce projet est sous licence MIT.

✍ Développé avec ❤️ par Angela
