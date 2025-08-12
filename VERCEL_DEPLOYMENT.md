# Vercel Deployment Guide

## Environment Variables Required

Before deploying to Vercel, you need to set the following environment variables in your Vercel dashboard:

### Database
- `DATABASE_URL`: Your PostgreSQL connection string (e.g., from Vercel Postgres, Supabase, or other provider)

### NextAuth
- `NEXTAUTH_URL`: Your production domain (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET`: A secure random string for JWT encryption

### Vercel Blob (for photo uploads)
- `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob storage token

### Admin
- `ADMIN_EMAIL`: Email address for admin access

## Setting Environment Variables in Vercel

1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add each variable with the appropriate values for production

## Database Setup

### Option 1: Vercel Postgres (Recommended)
1. In your Vercel dashboard, go to the "Storage" tab
2. Create a new Postgres database
3. Copy the `DATABASE_URL` from the connection details
4. Add it to your environment variables

### Option 2: External Database (Supabase, PlanetScale, etc.)
1. Create a PostgreSQL database with your preferred provider
2. Get the connection string
3. Add it as `DATABASE_URL` in Vercel environment variables

## Deployment Process

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set all required environment variables
4. Deploy

The `postinstall` script will automatically run `prisma generate` during deployment.

## Troubleshooting

If you encounter Prisma Client errors during deployment:
1. Ensure `DATABASE_URL` is set correctly
2. Verify the database is accessible from Vercel
3. Check that all environment variables are properly configured
4. The build process includes both `postinstall` and explicit `prisma generate` in the build script
