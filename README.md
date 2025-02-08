🎬 MoviePulse - Plateforme de Films

MoviePulse est une plateforme permettant aux utilisateurs de parcourir un catalogue de films, d'ajouter des films à leurs favoris et à leur panier, puis de finaliser un paiement fictif.
L'authentification des utilisateurs est gérée via Supabase, tandis que les films, favoris et informations utilisateurs sont stockés dans MongoDB.


📌 Technologies utilisées

    Next.js - Framework React pour le frontend et backend (API Routes)
    TypeScript - Typage statique pour une meilleure fiabilité
    MongoDB - Stockage des films, utilisateurs et favoris
    Supabase - Gestion de l'authentification des utilisateurs
    Tailwind CSS - Pour le design et le style
    Node.js - Exécution du code backend et scripts d'import/export


🚀 Installation et Configuration
1️⃣ Cloner le projet

git clone https://github.com/Ange933/MoviePulse.git
cd moviepulse

2️⃣ Installer les dépendances

npm install

3️⃣ Configurer les variables d'environnement

Crée un fichier .env.local à la racine du projet et ajoute :

# ✅ Connexion à MongoDB
MONGO_URI=mongodb+srv://moviepulse:<db_password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
DB_NAME=moviepulse

# ✅ Clés Supabase pour l'authentification
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxx

🚨 Remplace <db_password> par le vrai mot de passe MongoDB.
🚨 Récupère SUPABASE_URL et SUPABASE_ANON_KEY depuis ton tableau de bord Supabase.
🏗️ Configuration de Supabase
📌 1. Créer un compte Supabase

    Va sur https://supabase.com
    Crée un projet et récupère SUPABASE_URL et SUPABASE_ANON_KEY
    Supabase stocke uniquement l'adresse e-mail et le mot de passe crypté des utilisateurs.
    Toutes les autres données (films, favoris, utilisateurs) sont stockées dans MongoDB.

📌 2. Activer l'authentification par e-mail

Dans Supabase :

    Va dans Authentication > Settings
    Active Email Authentication

🗄️ Configuration de la base MongoDB
📌 1. Créer les collections MongoDB

Tu dois créer trois collections dans ta base de données MongoDB :

    - users (contient l'UUID de Supabase et l'email de l'utilisateur)
    - movies (contient la liste des films)
    - favorites (contient les films favoris de chaque utilisateur)

📌 2. Importer les films

Importer les films depuis data.json :

mongoimport --uri "mongodb+srv://moviepulse:<db_password>@cluster0.mongodb.net/moviepulse" --collection movies --file data.json --jsonArray

🚨 Remplace <db_password> par le mot de passe réel.
🏃‍♂️ Lancer le projet

npm run dev

Accède ensuite à l'application sur http://localhost:3000


🛠 Améliorations futures

    - Ajouter un système de recherche et de filtres pour les films
    - Implémenter un vrai système de paiement (Stripe, PayPal)
    - Ajouter des recommandations de films personnalisées
