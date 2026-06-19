# Green Afreeca - E-commerce de Super-Aliments Africains Bio

## 🌿 Description du Projet

Green Afreeca est une plateforme e-commerce Full-Stack moderne, performante et hautement sécurisée dédiée à la commercialisation de super-aliments africains bio (Baobab, Moringa, Bissap, Gingembre, Sucre Noir, Lait de Coco). Conçue sur une architecture multicouche découplée (MERN Stack) et entièrement conteneurisée, cette application propose une alternative naturelle et puissante aux compléments alimentaires synthétiques traditionnels.

Le projet a été développé en respectant scrupuleusement les exigences du référentiel **Concepteur Développeur d'Applications (CDA)**, mettant l'accent sur la séparation des responsabilités (MVC), la sécurité des données (OWASP/RGPD) et la gestion de la dette technique en méthodologie agile.

---

## 🛠️ Stack Technique

### Frontend (Application Client)

- **Framework** : React 18 avec TypeScript (Typage statique fort pour la fiabilité de l'UI)
- **Gestion d'état globale** : React Context API (State management léger et performant pour le panier d'achat)
- **Routage** : React Router DOM v6 (Gestion des routes dynamiques et protection d'accès)
- **Styling & Design System** : Tailwind CSS avec des variables natives HSL (Prêt pour le Dark Mode)
- **Composants UI** : Shadcn/ui (Architecture basée sur la possession du code source et l'accessibilité Radix UI)
- **Build Tool** : Vite

### Backend (Architecture API REST)

- **Environnement d'exécution** : Node.js (Asynchrone, non bloquant)
- **Framework Web** : Express (Gestion du routage, des middlewares et du cycle de vie des requêtes)
- **Modélisation & ORM** : Mongoose (Schématisation, validation et hooks de cycle de vie NoSQL)
- **Sécurité & Chiffrement** : Bcryptjs (Hachage des mots de passe avec grain de sel) & Crypto (Tokens éphémères)
- **Gestion des Sessions** : JSON Web Tokens (JWT) encapsulés dans des cookies sécurisés `httpOnly`
- **Passerelle de Paiement** : API Stripe (Tunnel de paiement sécurisé avec calcul des frais à la volée)
- **Service de Messagerie** : Nodemailer (Formulaire de contact et flux de réinitialisation de mot de passe)

### Infrastructure & DevOps

- **Conteneurisation** : Docker & Docker Compose (Isolant l'API Node.js et la base de données MongoDB)
- **Persistance des Données** : Volumes Docker pour l'ancrage des données physiques de MongoDB

---

## 🎯 Fonctionnalités Clés Implémentées

### 🛒 Expérience Client (Front-end & Tunnel d'achat)

- **Catalogue Dynamique** : Affichage en temps réel des produits, prix et descriptions synchronisés avec MongoDB.
- **Panier d'Achat Global** : Gestion asynchrone des articles avec prise en charge avancée des variantes (formats/tailles) et persistance automatique dans le `localStorage`.
- **Tunnel de Commande Sécurisé** : Intégration de la solution de paiement Stripe avec bascule automatique des frais de livraison selon le montant du panier.
- **Espace Compte Personnel** : Inscription, connexion, consultation de l'historique des commandes et gestion sécurisée du profil.
- **Sécurité et RGPD** : Bandeau de gestion du consentement des cookies (`CookieBanner`) et purge totale des sessions (`localStorage` + Cookies) lors de la déconnexion.
- **Formulaire de Contact** : Passerelle d'envoi d'emails transactionnels asynchrones connectée à Nodemailer.

### 👑 Tableau de Bord Administrateur (Back-Office)

- **Gestion du Catalogue (CRUD)** : Interface complète pour ajouter, modifier ou supprimer des produits (avec saisie d'URLs d'images externes compatibles CDN).
- **Suivi Logistique des Commandes** : Visualisation globale de toutes les ventes du site et bouton d'action pour marquer un colis comme "Livré" avec historisation des dates.
- **Gestion des Utilisateurs** : Contrôle des comptes et des rôles.

---

## 🐳 Architecture de l'Infrastructure (Docker Compose)

L'application est orchestrée de manière centralisée pour garantir la reproductibilité parfaite de l'environnement de développement et de production.

Le fichier `docker-compose.yml` pilote deux services interconnectés au sein d'un réseau privé virtuel :

1. **`api`** : Le conteneur exécutant le serveur Node.js/Express (Exposé sur le port 3000). Il utilise un mécanisme de montage de volumes pour intégrer les modifications de code en temps réel sans nécessiter de reconstruction de l'image.
2. **`mongo_db`** : Le conteneur de la base de données officielle MongoDB (Exposé sur le port 27017 pour l'analyse via MongoDB Compass).

Un **Volume Docker nommé (`mongo_data`)** est configuré pour assurer la persistance absolue des données sur le disque dur de la machine hôte, empêchant toute perte d'informations lors du cycle de vie des conteneurs (`docker-compose down`).

---

## 🗄️ Architecture des Données (Modèles Mongoose)

### 1. Modèle `User` (Utilisateurs)

- **Champs** : `firstName`, `lastName`, `email` (unique/validé), `password` (chiffré), `role` (enum: client/admin), `addresses` (sous-documents imbriqués), `resetPasswordToken`, `resetPasswordExpire`.
- **Sécurité** : Hook `.pre('save')` pour le hachage asynchrone automatique des mots de passe via Bcrypt avant l'écriture en base de données.

### 2. Modèle `Product` (Catalogue)

- **Champs** : `name` (unique), `slug` (unique), `description`, `usage` (mode d'emploi modifiable), `marketing_claim`, `price`, `stock`, `is_bio`, `category`, `image_url`, `rating`, `num_reviews`.
- **Rigueur** : Validation stricte des prix et stocks minimums (`min: 0`) directement au niveau de la couche ORM.

### 3. Modèle `Order` (Commandes)

- **Champs** : `user` (Relation `ObjectId` avec la collection Users), `orderItems` (Tableau dénormalisé), `shippingAddress`, `paymentMethod`, `paymentResult`, `itemsPrice`, `shippingPrice`, `totalPrice`, `isPaid`, `paidAt`, `isDelivered`, `deliveredAt`.
- **Bonne pratique de dénormalisation** : Les informations critiques des produits (`name`, `price`, `image_url`) sont copiées en dur dans le document de la commande au moment de l'achat. Cela immunise l'historique des factures clients contre les modifications ultérieures du catalogue par l'administrateur.

---

## 🚀 Installation et Lancement Rapide

### 1. Configuration des Environnements

Créez un fichier `.env` dans le dossier racine du Back-end en vous basant sur les variables d'infrastructure (Clés Stripe, identifiants SMTP Mailtrap, configurations JWT).

### 2. Démarrage de l'Infrastructure Globale

Pour lancer l'ensemble de l'écosystème (API + Base de données + Persistance), exécutez la commande suivante à la racine du projet :

```bash
docker-compose up --build
```

📁 Structure Macro du Projet

afreeca-bio-superfoods/
├── backend/
│ ├── controllers/ # Logique métier et contrôleurs de requêtes (Auth, Order, Product, Stripe)
│ ├── middleware/ # Intercepteurs de sécurité (Vérification JWT, RBAC Admin)
│ ├── models/ # Schémas de données Mongoose (User, Product, Order)
│ ├── routes/ # Routeurs Express RESTful découpés par entité
│ ├── utils/ # Services utilitaires ( sendEmail via Nodemailer)
│ ├── Dockerfile # Instructions de construction de l'image de l'API
│ └── server.js # Point d'entrée principal, configuration CORS et connexion BDD
├── frontend/
│ ├── src/
│ │ ├── components/ # Composants d'interface (Navbar, Footer, CookieBanner)
│ │ ├── contexts/ # Gestionnaires d'états globaux (CartContext)
│ │ ├── hooks/ # Hooks personnalisés et moteurs d'alertes (useToast)
│ │ ├── pages/ # Vues de l'application et Dashboard d'administration
│ │ ├── services/ # Centralisation des appels API Axios (productService)
│ │ └── index.css # Design System global basé sur les variables HSL
│ └── docker-compose.yml # Orchestrateur multi-conteneurs (API & MongoDB)

3. Lancement du Front-end (React)
   Dans un second terminal, accédez au dossier du Front-end, installez les dépendances et lancez le serveur d'interface :

Bash
npm install
npm run dev
L'interface utilisateur sera accessible sur http://localhost:8080.
