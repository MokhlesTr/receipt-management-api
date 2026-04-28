const Recipe = require('../models/Recipe');

// @desc    Get all recipes (with filtering and sorting)
// @route   GET /api/recipes
// @access  Public
exports.getRecipes = async (req, res, next) => {
  try {
    let query;

    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude from direct filtering
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    // Finding resource
    query = Recipe.find(reqQuery).populate({
      path: 'category',
      select: 'name description'
    });

    // Sort (default: newest first)
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Executing query
    const recipes = await query;

    res.status(200).json({
      success: true,
      message: 'Recipes retrieved successfully',
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate({
      path: 'category',
      select: 'name'
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe retrieved successfully',
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Public
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Public
exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Public
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search recipes by name
// @route   GET /api/recipes/search
// @access  Public
exports.searchRecipes = async (req, res, next) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a name query parameter'
      });
    }

    const recipes = await Recipe.find({
      name: { $regex: name, $options: 'i' }
    }).populate('category');

    res.status(200).json({
      success: true,
      message: `Search results for "${name}"`,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    next(error);
  }
};
