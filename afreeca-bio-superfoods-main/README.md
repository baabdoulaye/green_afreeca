Green Afreeca - Organic African Superfoods E-commerce
Project Description
Green Afreeca is a modern, high-performance, and highly secure Full-Stack e-commerce platform dedicated to marketing organic African superfoods (Baobab, Moringa, Hibiscus, Ginger, Black Sugar, Coconut Milk). Built on a decoupled multi-layer architecture (MERN Stack) and fully containerized, this application offers a natural and powerful alternative to traditional synthetic dietary supplements.

The project was developed in strict accordance with the requirements of the Concepteur Développeur d'Applications (CDA) curriculum, focusing on separation of concerns (MVC), data security (OWASP/GDPR), and technical debt management through agile methodology.

Technical Stack
Frontend (Client Application)
Framework: React 18 with TypeScript (Strong static typing for UI reliability)

Global State Management: React Context API (Lightweight and performant state management for the shopping cart)

Routing: React Router DOM v6 (Dynamic routing and access protection)

Styling & Design System: Tailwind CSS using native HSL variables (Dark Mode ready)

UI Components: Shadcn/ui (Architecture based on code ownership and Radix UI accessibility)

Build Tool: Vite

Backend (REST API Architecture)
Runtime Environment: Node.js (Asynchronous, non-blocking)

Web Framework: Express (Request routing, middleware management, and request lifecycle)

Modeling & ORM: Mongoose (Schema definition, validation, and NoSQL lifecycle hooks)

Security & Encryption: Bcryptjs (Password hashing with salt) & Crypto (Ephemeral tokens)

Session Management: JSON Web Tokens (JWT) encapsulated in secure httpOnly cookies

Payment Gateway: Stripe API (Secure payment tunnel with automated shipping fee calculation)

Messaging Service: Nodemailer (Contact form and password reset flow)

Infrastructure & DevOps
Containerization: Docker & Docker Compose (Isolating Node.js API and MongoDB database)

Data Persistence: Docker Volumes for physical MongoDB data storage

Key Features Implemented
Customer Experience (Front-end & Checkout)
Dynamic Catalog: Real-time display of products, prices, and descriptions synchronized with MongoDB.

Global Shopping Cart: Asynchronous item management with advanced variant support (sizes/formats) and automatic persistence in localStorage.

Secure Checkout: Stripe payment integration with automatic shipping fee toggling based on cart total.

User Account Space: Registration, login, order history, and secure profile management.

Security and GDPR: Consent management banner (CookieBanner) and total session purging (localStorage + Cookies) upon logout.

Contact Form: Asynchronous transactional email gateway connected to Nodemailer.

Administrator Dashboard (Back-Office)
Catalog Management (CRUD): Full interface for adding, modifying, or deleting products (with input for CDN-compatible external image URLs).

Order Logistics Tracking: Global view of all site sales and an action button to mark packages as "Delivered," with historical date tracking.

User Management: Account and role control.

Infrastructure Architecture (Docker Compose)
The application is centrally orchestrated to ensure perfect reproducibility of the development and production environments.

The docker-compose.yml file manages two interconnected services within a private virtual network:

api: The container running the Node.js/Express server (Exposed on port 3000). It uses volume mounting to integrate code changes in real-time without requiring image rebuilds.

mongo_db: The official MongoDB database container (Exposed on port 27017 for analysis via MongoDB Compass).

A named Docker Volume (mongo_data) is configured to ensure absolute data persistence on the host machine's disk, preventing any data loss during container lifecycles (docker-compose down).

Data Architecture (Mongoose Models)

1. User Model
   Fields: firstName, lastName, email (unique/validated), password (encrypted), role (enum: client/admin), addresses (nested sub-documents), resetPasswordToken, resetPasswordExpire.

Security: .pre('save') hook for automated asynchronous password hashing via Bcrypt before database writing.

2. Product Model
   Fields: name (unique), slug (unique), description, usage (editable instructions), marketing_claim, price, stock, is_bio, category, image_url, rating, num_reviews.

Rigour: Strict validation of prices and minimum stocks (min: 0) directly at the ORM layer.

3. Order Model
   Fields: user (ObjectId relationship with Users collection), orderItems (denormalized array), shippingAddress, paymentMethod, paymentResult, itemsPrice, shippingPrice, totalPrice, isPaid, paidAt, isDelivered, deliveredAt.

Denormalization Best Practice: Critical product information (name, price, image_url) is hard-copied into the order document at the time of purchase. This immunizes client invoice history against subsequent catalog modifications by the administrator.

Installation and Quick Start

1. Environment Configuration
   Create a .env file in the Back-end root directory based on the infrastructure variables (Stripe Keys, SMTP Mailtrap credentials, JWT configurations).

2. Launch Global Infrastructure
   To launch the entire ecosystem (API + Database + Persistence), run the following command at the project root:

Bash
docker-compose up --build
Project Macro Structure

afreeca-bio-superfoods/
├── backend/
│ ├── controllers/ # Business logic and request controllers (Auth, Order, Product, Stripe)
│ ├── middleware/ # Security interceptors (JWT Verification, Admin RBAC)
│ ├── models/ # Mongoose data schemas (User, Product, Order)
│ ├── routes/ # RESTful Express routers split by entity
│ ├── utils/ # Utility services (sendEmail via Nodemailer)
│ ├── Dockerfile # API image construction instructions
│ └── server.js # Main entry point, CORS configuration, and DB connection
├── frontend/
│ ├── src/
│ │ ├── components/ # Interface components (Navbar, Footer, CookieBanner)
│ │ ├── contexts/ # Global state managers (CartContext)
│ │ ├── hooks/ # Custom hooks and alert engines (useToast)
│ │ ├── pages/ # Application views and Admin Dashboard
│ │ ├── services/ # Centralized Axios API calls (productService)
│ │ └── index.css # Global Design System based on HSL variables
│ └── docker-compose.yml # Multi-container orchestrator (API & MongoDB)

3. Launch Front-end (React)
   In a second terminal, navigate to the Front-end directory, install dependencies, and launch the interface server:

Bash
npm install
npm run dev
The user interface will be accessible at http://localhost:8080.
