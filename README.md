# Braylon's Construction Birthday Website 🚧

A luxury construction-themed birthday website for Braylon's 3rd birthday celebration on October 4th, 2025.

## 🚨 Production Ready - No Mock Data Policy

This application is **production-ready** and enforces a strict **no mock data policy**. All database operations use real Prisma queries. See [NO_MOCK_DATA.md](./NO_MOCK_DATA.md) for enforcement details.

## 🏗️ Features

### ✅ Completed
- **Luxury Design**: Premium construction-themed UI with animations
- **Hero Section**: Animated construction vehicles and countdown
- **RSVP System**: Complete with validation and real database storage
- **Food Signup**: Separate form for bringing snacks/food
- **Construction Game**: Interactive 3D game with Three.js
- **Countdown Timer**: Real-time countdown to October 4th
- **Responsive Design**: Works on all devices
- **Production Database**: Real Prisma operations with PostgreSQL
- **Admin Authentication**: Secure admin panel with bcrypt passwords

### 🎯 Vercel Deployment Ready

#### Required Environment Variables
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_URL="https://braylon.ca"
NEXTAUTH_SECRET="your-secure-secret-key"
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
ADMIN_EMAIL="your-admin-email@domain.com"
```

#### Quick Deploy Steps
1. Set environment variables in Vercel dashboard
2. Connect GitHub repository to Vercel
3. Deploy - all database operations are production-ready
4. No mock data to replace - ready for live use!

#### 4. Admin Panel (Coming Next)
- Photo upload with construction overlays
- Admin dashboard for managing RSVPs
- Data export functionality
- CMS for content management

#### 5. Additional Features
- Photo gallery with Snapchat-like filters
- Game score tracking
- Guest photo uploads
- Real-time notifications

## 🛡️ Quality Assurance

- **No Mock Data**: Enforced via GitHub Actions, ESLint, and pre-commit hooks
- **TypeScript**: Full type safety with strict compilation
- **ESLint**: Custom rules to prevent mock data usage
- **Production Validation**: Automated checks for deployment readiness
- **Database Validation**: Ensures DATABASE_URL is set in production

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Check for mock data (optional)
npm run check:no-mock

# Set up database with your DATABASE_URL
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## 🎨 Design System

- **Colors**: Construction yellow (#FFD700), safety orange (#FF8C00), steel gray
- **Typography**: Bold, playful fonts perfect for kids
- **Animations**: Smooth transitions and interactive elements
- **Icons**: Construction vehicles and tools throughout

## 📱 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Storage**: Vercel Blob for photos
- **Deployment**: Vercel

## 🎮 Game Features

- **Interactive 3D Construction Site**
- **Excavator Controls**: Drive and operate construction vehicles
- **Building Challenges**: Stack blocks to build towers
- **Physics Engine**: Realistic gravity and collisions
- **Score Tracking**: Compete for highest scores

## 📸 Photo Features (Coming Soon)

- **Construction Overlays**: Hard hats, safety vests, vehicle stickers
- **Birthday Frames**: "Braylon's 3rd Construction Birthday" themes
- **Age Progression**: See what Braylon will look like at 5, 10 years old
- **Guest Uploads**: RSVP'd guests can upload photos

## 🎯 Deployment Checklist

- [ ] Set up PostgreSQL database
- [ ] Configure environment variables
- [ ] Set up custom domain (braylon.ca)
- [ ] Deploy to Vercel
- [ ] Test all forms and features
- [ ] Set up admin credentials
- [ ] Configure photo storage
- [ ] Test on mobile devices

## 📊 Admin Features

- **Dashboard**: View all RSVPs and food signups
- **Export Data**: Download CSV files of all responses
- **Photo Moderation**: Approve/reject uploaded photos
- **Real-time Stats**: Track visitor engagement
- **Content Management**: Edit all text and images

## 🎉 Ready for Launch!

The website is now ready for deployment. The construction theme is fully implemented with luxury components, smooth animations, and all requested features. The countdown is live and counting down to October 4th, 2025!

Visit: http://localhost:3000 to see it in action!
