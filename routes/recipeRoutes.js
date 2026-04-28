const express = require('express');
const {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes
} = require('../controllers/recipeController');

const router = express.Router();

router.get('/search', searchRecipes);

router
  .route('/')
  .get(getRecipes)
  .post(createRecipe);

router
  .route('/:id')
  .get(getRecipe)
  .put(updateRecipe)
  .delete(deleteRecipe);

module.exports = router;
