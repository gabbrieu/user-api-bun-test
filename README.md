# Simple User CRUD with Bun + Elysia + SQLite

This simple User CRUD was made to study Bun.

The repository was made following the Clean Architecture with some changes.

-   The API was made with [Elysia](https://elysiajs.com/) framework for Bun.
-   The Database management was made with [Drizzle ORM](https://orm.drizzle.team/).

## Getting Started

1. After clone the repository, create a SQLite database file named `database.sqlite` under the db folder;
2. Run the migration run script with `bun run migration:run` command;
3. Create a .env file following the .env.example file.

## Running the project

You can run the project with Docker or not:

### Docker

To run with Docker, just use the Docker Compose command:

```bash
docker compose up -d
```

Or build and run the Docker image by yourself.

### Without Docker

To run without Docker, use the following command:

```bash
bun run dev
```

Both ways will start a development server in watch mode on http://localhost:3000 if PORT was not set in your .env file.

### User CRUD

The User API is under the http://localhost:3000/users endpoint, and it has all CRUD + login endpoints:

-   Get one user - GET http://localhost:3000/users/:id
-   Get all users - GET http://localhost:3000/users
-   Create an user - POST http://localhost:3000/users
-   Update an user - PATCH http://localhost:3000/users/:id
-   Delete an user - DELETE http://localhost:3000/users/:id
-   Login - POST http://localhost:3000/users/login
-   Logout - POST http://localhost:3000/users/logout

The /login endpoint serves a cookie to be used in all endpoints but the create an user and itself.

The DTOs to login, update and create an user can be seen in the `src/domain/entities/user.entity.interface.ts` file.

## Tests

To run the tests, run the following command:

```bash
bun run test
```

This command will run all e2e tests in the repository. Make sure your PORT 3001 is not busy.
