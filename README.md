# Book Summary 
The app allows users to register, log in, **search for books**, **summarize them**, and manage their personal collection of summarized books.  

## Overview
This project was created as a full-stack web app for managing book summaries.  
It uses **Next.js** for the frontend and API routes + Server actions, **Prisma** as the ORM, and a SQLite database for storage.  

With this app, users can:
- Register and log in to their account  
- Search for books  
- Generate and view AI-based summaries  
- Save summaries into their personal collection  
- Revisit stored summaries anytime in their dashboard

## Features
- User authentication (sign in / sign up)  
- Search for books  
- Generate and view summaries  
- Dashboard with introduction and personal book list  
- Dynamic book detail pages with slugs  
- Database migrations with Prisma  
- Responsive UI with CSS Modules
- Reusable UI components (buttons, cards, spinner, …)

## Tech Stack
- **Next.js 14 (App Router)** – React framework  
- **TypeScript** – type safety  
- **Prisma** – database ORM  
- **SQLite** – development database  
- **CSS Modules** – styling
  
## Environment Variables
The project requires some environment variables to be set in a `.env` file.  
Create a `.env` file in the root of your project with the following keys (example):

```env
# Google API Key (used for book search or related services)
NEXT_PUBLIC_GOOGLE_API_KEY="your-google-api-key"

# Base URL of the application (used for redirects, API calls, etc.)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Session secret for authentication
SESSION_SECRET="your-session-secret"

# OpenAI API key for generating book summaries
OPENAI_API_KEY="your-openai-api-key"

# Prisma database connection string
DATABASE_URL="file:./prisma/dev.db"
```

## Installation & Setup
1. Clone the repository:
  ```bash
  # Klonovanie projektu
  git clone https://github.com/focuscw0w/book-summary.git
  cd book-summary
 ```
2. npm install
3. Set up environment variables in .env (see Environment Variables).
4. npx prisma migrate dev (this will also create prisma/dev.db if it doesn’t exist):
5. npm run dev
6. http://localhost:3000

