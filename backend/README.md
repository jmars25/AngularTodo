# Backend API

.NET 8 Web API following Clean Architecture principles.

## Project Structure

- **Api** - Web API layer (Controllers, Program.cs)
  - Controllers - API endpoints
  - Models - Request/Response models
  - Services - Business logic services
  - DTOs - Data Transfer Objects
  - Data - Database context
  - Middleware - Custom middleware
  - Configuration - Configuration classes

- **Api.Core** - Core business logic and domain entities
  - Interfaces - Service and repository interfaces
  - Entities - Domain models

- **Api.Infrastructure** - Data access and external services
  - Repositories - Data access implementations
  - Data - Database configurations

- **Api.Tests** - Unit and integration tests
  - Unit - Unit tests
  - Integration - Integration tests

## Getting Started

1. Restore packages:
   ```
   dotnet restore
   ```

2. Build the solution:
   ```
   dotnet build
   ```

3. Run the API:
   ```
   cd Api
   dotnet run
   ```

4. Access Swagger UI:
   ```
   https://localhost:5001/swagger
   ```

## Running Tests

```
dotnet test
```
