# Khademni - Algerian Freelance Marketplace MVP

Khademni is a modern full-stack freelance platform tailored for the Algerian market. It allows users to both hire talent and offer services with a single unified account.

## Features

- **Authentication**: Email/Password, Google Auth, Forgot Password.
- **Unified Profile**: Showcase skills, portfolio, ratings, and trust scores.
- **Project Marketplace**: Post projects with budgets and deadlines; browse and filter projects.
- **Proposal System**: Submit bids with price and delivery time.
- **Real-time Messaging**: Built-in chat using Firestore Realtime updates.
- **Premium UI**: Responsive design with Tailwind CSS, shadcn/ui, and Framer Motion.
- **Trust System**: Automated trust score based on verifications and reviews.
- **Dashboard**: Centralized management of projects, offers, and orders.
- **Admin Panel**: User and project moderation.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS v4, shadcn/ui.
- **Backend**: Firebase (Authentication, Firestore, Storage).
- **Animations**: Framer Motion.
- **Icons**: Lucide React.

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd khadimdz
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Enable Firebase Features
- Go to [Firebase Console](https://console.firebase.google.com/).
- Enable **Authentication** (Email/Password & Google).
- Enable **Firestore Database** (Start in test mode or set appropriate rules).
- Enable **Firebase Storage**.

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Folder Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components (shadcn and custom).
- `src/context`: Auth and Global contexts.
- `src/lib`: Firebase configuration and utility functions.
- `src/types`: TypeScript definitions.
- `src/hooks`: Custom React hooks.

## Deployment

The project is optimized for deployment on **Vercel**. Simply connect your GitHub repository and add the environment variables.

---

Made for the Algerian Freelance Community. 🇩🇿
