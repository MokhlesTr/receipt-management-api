# Recipe Manager API

A complete RESTful API for managing a cooking recipe application. Built with Node.js, Express, and MongoDB.

## Features

- **Categories Management**: Full CRUD operations for recipe categories.
- **Recipe Management**: Full CRUD operations for recipes.
- **Advanced Search**: Search recipes by name.
- **Filtering**: Filter recipes by category and difficulty level.
- **Sorting**: Recipes are sorted by creation date (newest first) by default.
- **Data Integrity**: Mongoose validation and error handling.
- **Relationship**: Recipes are linked to categories using MongoDB ObjectIds and `populate()`.

## Tech Stack

- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **Morgan** (Logging)
- **CORS** (Cross-Origin Resource Sharing)
- **Dotenv** (Environment Variables)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/recipe_manager
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a single category
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Recipes
- `GET /api/recipes` - Get all recipes (supports filtering)
  - Query params: `category`, `difficulty`, `sort`
- `GET /api/recipes/search?name=pizza` - Search recipes by name
- `GET /api/recipes/:id` - Get a single recipe
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/:id` - Update a recipe
- `DELETE /api/recipes/:id` - Delete a recipe

## Response Formats

### Success
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "Detailed error message"
}
```

## Project Structure
```plaintext
backend/
├── config/             # Database connection
├── controllers/        # Business logic for routes
├── middleware/         # Custom error handling and 404
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── .env                # Environment variables
├── .gitignore          # Git ignored files
├── app.js              # Express app initialization
└── package.json        # Dependencies and scripts
```
