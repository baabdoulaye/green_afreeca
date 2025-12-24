# Green Afreeca - E-commerce de Super-Aliments Africains Bio

## 🌿 Description du Projet

Green Afreeca est une plateforme e-commerce moderne et élégante dédiée à la vente de super-aliments africains bio. Notre mission est de proposer une alternative naturelle et puissante aux compléments alimentaires traditionnels, en mettant en avant les bienfaits exceptionnels des produits africains.

### Produits Phares
- **Jus de Bouille (Baobab)** : 6x plus riche en Vitamine C que l'orange
- **Bissap (Hibiscus)** : Riche en antioxydants, régulation de la pression artérielle
- **Moringa** : L'arbre miracle, 7x plus de vitamine C que les oranges
- **Gingembre** : Anti-inflammatoire naturel, amélioration de la digestion

## 🎨 Caractéristiques de Design

### Design Minimaliste et Moderne
- **Style** : Flat design épuré avec utilisation intelligente du white space
- **Couleurs** : Palette harmonieuse Vert/Jaune/Rouge sur fonds neutres (Blanc, Gris clair)
- **Animations** : Transitions fluides et animations au scroll pour une expérience utilisateur exceptionnelle
- **Responsive** : Entièrement adaptatif sur Desktop, Tablette et Mobile

### Système de Couleurs (HSL)
```css
/* Vert Principal - Marque Green Afreeca */
--primary: 142 76% 36%

/* Jaune - Accents et highlights */
--accent: 45 93% 58%

/* Rouge - CTA et actions */
--secondary: 0 72% 51%

/* Fonds neutres */
--background: 0 0% 100% (Blanc)
--muted: 0 0% 96% (Gris clair)
```

## 🛠️ Stack Technique

### Frontend
- **Framework** : React 18 avec TypeScript
- **Routage** : React Router DOM v6
- **Styling** : Tailwind CSS avec design system personnalisé
- **UI Components** : Shadcn/ui (personnalisés)
- **Animations** : CSS animations avec Tailwind
- **Icônes** : Lucide React
- **Build Tool** : Vite

### Backend (À Connecter)
- **Base de Données** : MongoDB (externe, à configurer)
- **API** : Node.js + Express (à développer)
- **Authentification** : JWT (à implémenter)

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (v18 ou supérieur) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (v9 ou supérieur) - Inclus avec Node.js
- **Git** - [Télécharger Git](https://git-scm.com/)

## 🚀 Installation et Démarrage

### 1. Cloner le Projet
```bash
git clone <URL_DU_REPO>
cd green-afreeca
```

### 2. Installer les Dépendances
```bash
npm install
```

### 3. Démarrer le Serveur de Développement
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

### 4. Build pour la Production
```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

## 📁 Structure du Projet

```
green-afreeca/
├── src/
│   ├── assets/              # Images et médias
│   │   ├── hero-superfoods.jpg
│   │   ├── product-baobab.jpg
│   │   ├── product-bissap.jpg
│   │   ├── product-moringa.jpg
│   │   └── product-ginger.jpg
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/             # Composants UI de base (Shadcn)
│   │   ├── Navbar.tsx      # Barre de navigation
│   │   └── Footer.tsx      # Pied de page
│   ├── pages/              # Pages de l'application
│   │   ├── Home.tsx        # Page d'accueil
│   │   └── NotFound.tsx    # Page 404
│   ├── lib/                # Utilitaires
│   │   └── utils.ts
│   ├── hooks/              # Hooks React personnalisés
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles globaux et design system
├── public/                 # Fichiers publics statiques
├── tailwind.config.ts      # Configuration Tailwind CSS
├── vite.config.ts          # Configuration Vite
├── tsconfig.json           # Configuration TypeScript
└── README.md               # Ce fichier
```

## 🎯 Fonctionnalités Actuelles

### ✅ Implémenté
- ✅ Page d'accueil avec section Hero dynamique
- ✅ Affichage des produits en vedette avec images
- ✅ Navigation responsive avec menu mobile
- ✅ Footer avec liens et informations de contact
- ✅ Design system complet (couleurs, animations, typographie)
- ✅ Animations fluides au scroll et sur hover
- ✅ Images générées pour les produits

### 🔜 À Venir (Nécessite MongoDB)
- ⏳ Page catalogue complète des produits
- ⏳ Pages détails produits individuelles
- ⏳ Système de panier d'achat
- ⏳ Authentification utilisateur (inscription/connexion)
- ⏳ Gestion du compte utilisateur
- ⏳ Processus de checkout et paiement
- ⏳ Système de recherche et filtres
- ⏳ Avis et notations clients

## 🔌 Connexion à MongoDB (À Configurer)

### Architecture de Données MongoDB Recommandée

#### Collection : `users`
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  nom: String,
  prenom: String,
  telephone: String,
  adresse: {
    rue: String,
    ville: String,
    codePostal: String,
    pays: String
  },
  dateInscription: Date,
  derniereConnexion: Date
}
```

#### Collection : `products`
```javascript
{
  _id: ObjectId,
  nom: String (required),
  slug: String (unique, required),
  description: String,
  descriptionLongue: String,
  prix: Number (required),
  prixPromo: Number,
  images: [String], // URLs des images
  categorie: String,
  stock: Number,
  bienfaits: [String],
  utilisation: String,
  ingredients: String,
  origine: String,
  certifications: [String],
  actif: Boolean,
  dateAjout: Date
}
```

#### Collection : `orders`
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  numeroCommande: String (unique),
  produits: [{
    productId: ObjectId (ref: products),
    nom: String,
    prix: Number,
    quantite: Number
  }],
  montantTotal: Number,
  statut: String (enum: ['en_attente', 'confirmee', 'expediee', 'livree', 'annulee']),
  adresseLivraison: {
    nom: String,
    rue: String,
    ville: String,
    codePostal: String,
    pays: String,
    telephone: String
  },
  dateCommande: Date,
  dateLivraison: Date,
  methodePaiement: String,
  notes: String
}
```

#### Collection : `cart`
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  produits: [{
    productId: ObjectId (ref: products),
    quantite: Number
  }],
  dateModification: Date
}
```

### Justification de MongoDB

MongoDB est particulièrement adapté pour ce projet e-commerce car :

1. **Flexibilité du Schéma** : Permet d'ajouter facilement de nouveaux champs produits (variantes, options, etc.) sans migration complexe
2. **Performance** : Excellente performance pour les requêtes de lecture (catalogue produits)
3. **Scalabilité Horizontale** : Facilite la croissance du catalogue et du nombre d'utilisateurs
4. **Documents Imbriqués** : Structure naturelle pour les paniers, commandes avec produits
5. **Écosystème Node.js** : Intégration native avec l'écosystème JavaScript/TypeScript

### Configuration Backend Recommandée

```javascript
// Exemple de connexion MongoDB avec Mongoose
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error);
    process.exit(1);
  }
};
```

### Variables d'Environnement Nécessaires
Créer un fichier `.env` à la racine du projet backend :
```
MONGODB_URI=mongodb://localhost:27017/green-afreeca
JWT_SECRET=votre_cle_secrete_jwt
PORT=5000
```

## 🎨 Personnalisation du Design System

Le design system est défini dans `src/index.css` et `tailwind.config.ts`. Pour personnaliser :

### Couleurs
Modifier les variables CSS dans `src/index.css` :
```css
:root {
  --primary: 142 76% 36%;  /* Vert principal */
  --accent: 45 93% 58%;     /* Jaune */
  --secondary: 0 72% 51%;   /* Rouge */
}
```

### Animations
Ajouter de nouvelles animations dans `tailwind.config.ts` :
```typescript
keyframes: {
  "votre-animation": {
    "0%": { /* état initial */ },
    "100%": { /* état final */ }
  }
}
```

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev          # Démarre le serveur de développement

# Production
npm run build        # Crée le build de production
npm run preview      # Prévisualise le build de production

# Qualité du Code
npm run lint         # Vérifie le code avec ESLint
```

## 🤝 Contribution

Pour contribuer au projet :
1. Forkez le repository
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

## 📞 Contact

Pour toute question ou suggestion :
- **Email** : contact@greenafreeca.com
- **Site Web** : (À venir)

---

**Développé avec ❤️ pour promouvoir les super-aliments africains bio**
