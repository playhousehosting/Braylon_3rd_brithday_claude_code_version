# Braylon's Construction Birthday Website

Braylon's Construction Birthday Website is a Next.js 15 TypeScript web application featuring a construction-themed party website for a 3rd birthday celebration. The site includes RSVP management, interactive learning games, photo galleries, weather forecasts, and admin dashboard functionality.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Build the Repository:
- `npm install` -- takes ~75 seconds. NEVER CANCEL. Set timeout to 120+ seconds.
- `npm run build` -- takes ~35 seconds. NEVER CANCEL. Set timeout to 60+ seconds.
- `npm run lint` -- takes ~3 seconds. Always run before committing.

### Development Server:
- Start development server: `npm run dev` -- starts in ~2 seconds
- Access at: `http://localhost:3000`
- The website loads immediately and is fully functional for UI testing

### Database Setup (Optional for Development):
- **Important**: Prisma commands fail due to network restrictions (`npx prisma generate` and `npx prisma db push` cannot download engines)
- The application works perfectly for development and UI testing without a connected database
- Database-dependent features (RSVP submissions, admin panel) will show errors but UI remains functional
- For full functionality, set up PostgreSQL database and configure `DATABASE_URL` in `.env.local`

## Validation

### Always Manually Validate Changes:
- **UI Testing**: Navigate to `http://localhost:3000` and verify the website loads with construction theme
- **Form Testing**: Fill out RSVP form (Name: "Test User", Email: "test@example.com", select attendance)
- **Interactive Game**: Click "Start Learning Game!" and verify game interface appears with timer, score, and clickable items
- **Navigation**: Test all navigation buttons (Home, Details, RSVP, Weather, Photos, Learning Game)
- **Responsive Design**: Test on different viewport sizes

### Critical Validation Scenarios:
1. **Full Page Load**: Verify countdown timer displays and updates, construction vehicles animate
2. **RSVP Form**: Fill out completely and submit (will show no confirmation due to database limitations)
3. **Learning Game**: Start game, verify timer counts down, score tracking works, item selection functions
4. **Weather Section**: Verify weather forecast displays for party location (Towanda, Kansas)
5. **Photo Gallery**: Verify upload interface appears (file selection won't work without backend)

### Build Validation:
- Always run `npm run lint` -- takes 3 seconds, must show "No ESLint warnings or errors"
- Always run `npm run build` before finalizing changes -- takes 35 seconds, must complete successfully
- Verify build outputs show all routes compiled successfully

## Common Tasks

### Repository Structure:
```
src/
├── app/                 # Next.js 15 App Router pages
│   ├── page.tsx        # Main party website
│   ├── admin/          # Admin dashboard (requires auth)
│   └── api/            # API routes (RSVP, admin functions)
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── features/      # Feature-specific components
├── lib/               # Utility functions and configurations
└── middleware.ts      # NextAuth.js middleware
```

### Key Files to Check When Making Changes:
- **Main page**: `src/app/page.tsx` -- core party website
- **Components**: `src/components/` -- reusable UI elements
- **API routes**: `src/app/api/` -- backend functionality
- **Styling**: Uses Tailwind CSS classes throughout
- **Database**: `prisma/schema.prisma` -- data models

### Technology Stack:
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: SQLite (development) / PostgreSQL (production) with Prisma ORM
- **Authentication**: NextAuth.js (admin access requires @dynamicendpoints.com email)
- **3D Graphics**: Three.js with React Three Fiber for interactive game
- **Animations**: Framer Motion for smooth UI transitions
- **Form Handling**: React Hook Form with Zod validation

### Build Artifacts and Deployment:
- Build output: `.next/` directory (excluded from git)
- Static assets: `public/` directory
- Environment config: `.env.local` (not in git)
- Deployment: Optimized for Vercel platform

### Known Limitations in Development Environment:
- Prisma engine downloads fail due to network restrictions
- Admin authentication requires proper environment variables
- Photo uploads require Vercel Blob storage configuration
- RSVP submissions require connected database
- Some external analytics scripts blocked (Vercel Analytics)

### Performance Notes:
- Build includes optimization for production deployment
- Static assets are optimized by Next.js
- Images use Next.js Image component for optimization
- Three.js game components are dynamically loaded

## Environment Setup

### Required for Full Functionality:
```bash
# .env.local file contents:
DATABASE_URL="postgresql://username:password@host:port/database"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-secret-key"
ADMIN_EMAIL="admin@dynamicendpoints.com"
```

### Development vs Production:
- **Development**: Works without database for UI testing
- **Production**: Requires PostgreSQL database and environment variables
- **Admin Access**: Only emails with @dynamicendpoints.com domain can access `/admin`

### Quick Health Check Commands:
```bash
npm install          # ~75 seconds
npm run build        # ~35 seconds  
npm run lint         # ~3 seconds
npm run dev          # ~2 seconds to start
```

## Important Notes

### Design System:
- **Colors**: Construction yellow (#FFD700), safety orange (#FF8C00), steel gray
- **Theme**: Construction vehicles, hard hats, building tools throughout
- **Typography**: Bold, playful fonts suitable for children's party
- **Icons**: Lucide React icons for consistent iconography

### Features Status:
- ✅ **Working**: Main website, countdown, weather, learning game, navigation
- ✅ **Working**: RSVP form UI, photo gallery UI, responsive design
- ⚠️ **Limited**: RSVP submission (needs database), admin panel (needs auth)
- ⚠️ **Limited**: Photo uploads (needs Vercel Blob), score persistence (needs database)

### Party Details:
- **Date**: October 4th, 2025 (Saturday)
- **Time**: 2:00 PM - 6:00 PM
- **Location**: 4928 SW Cliff Road, Towanda, Kansas
- **Theme**: Construction vehicles and building activities

Always start by running `npm install && npm run build && npm run dev` to ensure the application works before making any changes. The website should load at http://localhost:3000 with a fully functional construction-themed birthday party interface.