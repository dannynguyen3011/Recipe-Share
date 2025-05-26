# Recipe App Backend

This is the backend for the Recipe App, built with PHP and MariaDB.

## Directory Structure

```
backend/
├── api/
│   ├── login.php            # Handles user authentication
│   ├── api_signup.php       # Handles user registration
│   ├── api_recipe_actions.php # Handles recipe saves and votes
│   └── db_connect.php       # Database connection configuration
└── create_tables.sql        # Database schema
```

## Setup

1. Configure your web server (Apache/Nginx) to serve the backend directory
2. Update `api/db_connect.php` with your MariaDB credentials
3. Run `create_tables.sql` to set up the database schema

## API Endpoints

### Authentication
- POST `/api/login.php`: User login
- POST `/api/api_signup.php`: User registration

### Recipe Actions
- POST `/api/api_recipe_actions.php`: Save/vote recipe
- DELETE `/api/api_recipe_actions.php`: Unsave/unvote recipe

## Response Format

All API endpoints return JSON in the following format:
```json
{
  "success": boolean,
  "user"?: {
    "id": number,
    "name": string,
    "email": string,
    "role": string,
    "createdAt": string,
    "savedRecipes": string[],
    "votedRecipes": string[]
  },
  "error"?: string
}
``` 