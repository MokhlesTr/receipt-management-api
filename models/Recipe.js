const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a recipe name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  ingredients: {
    type: [String],
    required: [true, 'Please add at least one ingredient']
  },
  instructions: {
    type: String,
    required: [true, 'Please add preparation instructions']
  },
  preparationTime: {
    type: Number,
    required: [true, 'Please add preparation time in minutes'],
    min: [1, 'Preparation time must be at least 1 minute']
  },
  difficulty: {
    type: String,
    required: [true, 'Please select difficulty level'],
    enum: ['Easy', 'Medium', 'Hard']
  },
  image: {
    type: String,
    default: 'no-photo.jpg'
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'Please assign a category to this recipe']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Recipe', RecipeSchema);
