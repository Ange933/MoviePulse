Création d'une application web avec Next.js, où les utilisateurs doivent s'inscrire (registration) et se connecter (login) pour accéder à une liste de films

✅ Fonctionnalités principales :

1️⃣ Authentification avec Supabase :

    Stocke les adresses e-mail et mots de passe hachés dans une base de données Supabase (PostgreSQL).
    Implémente l'inscription (registration) et la connexion (login) avec supabase.auth.
    Utilise bcrypt intégré pour sécuriser les mots de passe.
    Utilise JWT (JSON Web Tokens) pour gérer la session des utilisateurs.

2️⃣ Gestion des utilisateurs :

    Lorsqu'un utilisateur s'inscrit, il doit fournir un e-mail et un mot de passe.
    Une fois connecté, il est redirigé vers une page contenant la liste des films.
    Si un utilisateur essaie d'accéder aux films sans être connecté, il est redirigé vers la page de connexion.

3️⃣ Liste des films :

    Les films sont stockés dans Supabase dans une table movies.
    Chaque film contient un titre, une affiche (URL) et une description.
    Une route API sécurisée permet de récupérer les films uniquement si l'utilisateur est connecté.

4️⃣ Interface utilisateur :

    Utilisation de Tailwind CSS pour un design moderne et responsive.
    Une page de connexion avec un formulaire d'e-mail et de mot de passe.
    Une page d'inscription avec un formulaire similaire.
    Une page protégée affichant la liste des films après connexion.

5️⃣ Sécurité & Performance :

    Hachage des mots de passe via Supabase Auth (bcrypt intégré).
    Gestion des sessions avec JWT stocké dans les cookies.
    API sécurisée avec vérification du token avant d’accéder aux films.

✅ Stack technique :

    Next.js (Framework React)
    Supabase (PostgreSQL) (Base de données pour stocker les utilisateurs et les films)
    Supabase Auth (Gestion des utilisateurs & connexion)
    JWT (Authentification via token)
    Tailwind CSS (Design et mise en page)
    NextAuth.js ou API Routes personnalisées pour gérer l'authentification
