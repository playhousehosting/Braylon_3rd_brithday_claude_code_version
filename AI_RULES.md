# AI Development Rules & Guidelines

## Tech Stack Overview

• **Framework**: Next.js 15 with App Router for React server components and client components
• **Language**: TypeScript for type safety across the entire codebase
• **Styling**: Tailwind CSS with shadcn/ui components for consistent, responsive design
• **Database**: PostgreSQL with Prisma ORM for type-safe database operations
• **Authentication**: NextAuth.js for secure session management and admin access control
• **State Management**: React Hooks and React Server Components for state management
• **Animations**: Framer Motion for smooth UI animations and transitions
• **Forms**: React Hook Form with Zod validation for robust form handling
• **3D Graphics**: Three.js with React Three Fiber for interactive construction game
• **Deployment**: Vercel for seamless deployment with environment-specific configurations

## Library Usage Rules.

### UI Components
• **Primary UI Library**: Use shadcn/ui components exclusively for all UI elements
• **Icons**: Use Lucide React icons for all iconography needs
• **Styling**: Use Tailwind CSS classes for all styling - never use plain CSS files
• **Responsive Design**: All components must be mobile-first and responsive

### Data Management
• **Database Operations**: Use Prisma Client for all database interactions
• **API Routes**: Use Next.js API routes for all backend functionality
• **Data Validation**: Use Zod for all data validation and parsing
• **Form Handling**: Use React Hook Form for all form implementations

### Authentication & Security
• **Authentication**: Use NextAuth.js for all authentication flows
• **Authorization**: Implement role-based access control using NextAuth.js session callbacks
• **Environment Variables**: Store all secrets in environment variables, never in code

### Animations & Interactivity
• **Page Transitions**: Use Framer Motion for all animation needs
• **3D Graphics**: Use React Three Fiber and Drei for 3D components
• **Gestures**: Use Framer Motion for gesture handling and interactions

### Forms & Validation
• **Form State**: Use React Hook Form for complex form state management
• **Validation**: Use Zod resolvers with React Hook Form for validation
• **Error Handling**: Display user-friendly error messages with appropriate icons

### File Structure
• **Components**: Place reusable components in `src/components/`
• **Pages**: Place page components in `src/app/` following Next.js App Router conventions
• **API Routes**: Place API routes in `src/app/api/`
• **Libraries**: Place utility functions in `src/lib/`
• **Types**: Define TypeScript types in component files or create separate `.ts` files when shared

### Performance & Best Practices
• **Image Optimization**: Use Next.js Image component for all images
• **Code Splitting**: Use dynamic imports for heavy components
• **Server Components**: Prefer React Server Components when client interactivity is not needed
• **Bundle Size**: Avoid large libraries - prefer lightweight alternatives
• **Accessibility**: All components must follow accessibility best practices
