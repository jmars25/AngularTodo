# Frontend

Angular 17 application with standalone components and best practices.

## Project Structure

```
src/
├── app/
│   ├── core/              # Singleton services, guards, interceptors
│   ├── shared/            # Shared components, directives, pipes
│   ├── features/          # Feature modules (lazy-loaded)
│   ├── models/            # TypeScript interfaces and types
│   ├── services/          # Application services
│   ├── interceptors/      # HTTP interceptors
│   └── guards/            # Route guards
├── assets/                # Static assets
└── environments/          # Environment configurations
```

## Architecture

- **Standalone Components**: Uses Angular 17's standalone component architecture
- **Path Aliases**: Configured for cleaner imports (@app, @core, @shared, etc.)
- **Lazy Loading**: Feature modules are lazy-loaded for better performance
- **Type Safety**: Strict TypeScript configuration

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm start
   ```
   Navigate to `http://localhost:4200/`

3. Build for production:
   ```
   npm run build
   ```

4. Run tests:
   ```
   npm test
   ```

## Development Guidelines

- Use standalone components by default
- Keep components small and focused
- Use services for business logic
- Utilize path aliases for imports
- Follow the style guide in `.editorconfig`
