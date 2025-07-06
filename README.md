# Time Tracking SaaS

A time tracking and invoice generation application built with Next.js, NextAuth, and Prisma.

## Setup

1. Install dependencies:

```bash
npm install
```

1. Set up environment variables by creating a `.env` file and paste content of .env.example and fill with appropriate values.

2. Set up Google OAuth:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
   - Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
   - Copy the Client ID and Client Secret to your `.env` file

3. Set up the database:

```bash
npx prisma generate
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
```

## Features

- Google OAuth authentication
- Email/password authentication
- User registration and login
- Dashboard (coming soon)
- Time tracking (coming soon)
- Invoice generation (coming soon)
