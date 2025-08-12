# Admin Dashboard Setup Instructions

## 🔐 Admin Dashboard Access

The admin dashboard is now available at `/admin` and includes:

### Features:
- ✅ **Authentication Required** - Only authorized admins can access
- ✅ **RSVP Management** - View all party RSVPs with details
- ✅ **CSV Download** - Export RSVP list for planning
- ✅ **Real-time Stats** - Total RSVPs, attending, guest count

### Setup Steps:

#### 1. Configure Admin Emails
Edit the following files to add your admin email addresses:

**File: `src/app/api/admin/rsvps/route.ts`**
**File: `src/middleware.ts`**

```typescript
// Replace with your actual admin email
const ADMIN_EMAILS = ["your-email@example.com"]
```

#### 2. Set Up Authentication
Make sure NextAuth is configured in your environment:

**File: `.env.local`**
```
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=your-database-url
```

#### 3. Database Setup
Ensure your database is set up with the Prisma schema:
```bash
npm run prisma generate
npm run prisma db push
```

### 📊 Dashboard Features:

#### Statistics Cards:
- **Total RSVPs** - All submitted responses
- **Attending** - Guests confirmed to attend
- **Not Attending** - Guests who can't make it
- **Photos** - Uploaded party photos (coming soon)

#### RSVP Management:
- View detailed guest information
- See dietary restrictions and special requests
- Download complete list as CSV file

#### Security:
- Protected by NextAuth middleware
- Only specified admin emails can access
- Session-based authentication
- Secure API endpoints

### 🎯 Access the Dashboard:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the admin dashboard:**
   ```
   http://localhost:3000/admin
   ```

3. **Sign in with an admin email** (configured in step 1)

4. **Manage your party RSVPs!**

### 📝 Notes:
- The dashboard is responsive and works on mobile devices
- RSVP data includes user information from the main website
- CSV downloads include all necessary party planning information

### 🚀 Production Deployment:
- Update admin emails before deploying
- Ensure environment variables are set
- Test authentication with production URLs
- Verify database connectivity

---

**Security Note:** Only emails listed in the `ADMIN_EMAILS` array can access the admin dashboard. Make sure to update these before going live!