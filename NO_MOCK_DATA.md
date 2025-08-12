# No Mock Data Policy

This repository enforces a strict no-mock-data policy to ensure production readiness. All database operations must use real Prisma operations instead of mock data.

## Enforcement Mechanisms

### 1. GitHub Actions Workflows

- **`.github/workflows/no-mock-data.yml`**: Automatically checks for mock data patterns in PRs and pushes
- **`.github/workflows/production-validation.yml`**: Validates production readiness including build, lint, and Prisma setup

### 2. ESLint Rules

The ESLint configuration (`eslint.config.mjs`) includes custom rules to prevent:
- Variables with "mock" in the name
- Properties with "mock" in the name  
- Function calls with "mock" in the name

### 3. Pre-commit Script

- **`scripts/check-no-mock-data.sh`**: Local script to check for mock data before committing
- Run manually with: `npm run check:no-mock`

### 4. Production Environment Validation

- The `src/lib/prisma.ts` file validates that `DATABASE_URL` is set in production
- Throws an error if the database connection string is missing in production

## Detected Patterns

The following patterns are flagged as violations:

### Mock Data Patterns
- `mockRsvp`, `mockData`, `mock-*`
- `Mock*=`, `const *mock*`, `let *mock*`, `var *mock*`

### Example/Test Data
- `john@example.com`, `test@test.com`, `@example.com`
- `John Smith`, `Sarah Johnson`
- Hardcoded example data in API responses

## Production Deployment

### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string for production
- `NEXTAUTH_URL`: Your production domain
- `NEXTAUTH_SECRET`: Secure random string for JWT encryption

### Vercel Deployment
1. Set all required environment variables in Vercel dashboard
2. Connect your GitHub repository
3. The `postinstall` script will automatically run `prisma generate`
4. Deploy

## Development Setup

1. Install dependencies: `npm install`
2. Set up local database: `DATABASE_URL="file:./dev.db"`
3. Generate Prisma client: `npx prisma generate`
4. Run development server: `npm run dev`

## Bypassing Checks (Not Recommended)

If absolutely necessary, you can bypass local pre-commit checks with:
```bash
git commit --no-verify
```

However, GitHub Actions will still enforce the no-mock-data policy on PRs and pushes to main.

## Contributing

When adding new features:
1. Use real Prisma operations for all database interactions
2. Avoid hardcoded example data
3. Test locally with the mock data check: `npm run check:no-mock`
4. Ensure TypeScript compilation passes: `npx tsc --noEmit`
5. Run linting: `npm run lint`