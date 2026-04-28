const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Recipe = require('./models/Recipe');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to DB
const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany();
    await Recipe.deleteMany();

    console.log('Data cleared...');

    // Create Categories
    const categories = await Category.insertMany([
      { name: 'Italian', description: 'Traditional Italian recipes including pasta and pizza.' },
      { name: 'Asian', description: 'Diverse recipes from across Asia.' },
      { name: 'Desserts', description: 'Sweet treats and decadent desserts.' },
      { name: 'French', description: 'Elegant and classic French cuisine.' }
    ]);

    const italianId = categories.find(c => c.name === 'Italian')._id;
    const asianId = categories.find(c => c.name === 'Asian')._id;
    const dessertId = categories.find(c => c.name === 'Desserts')._id;

    // Create Recipes
    await Recipe.insertMany([
      {
        name: 'Margherita Pizza',
        description: 'A classic Italian pizza with fresh basil, mozzarella, and tomato sauce.',
        ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
        instructions: '1. Preheat oven to 450°F.\n2. Roll out dough.\n3. Spread sauce and top with cheese.\n4. Bake for 12-15 minutes.\n5. Top with fresh basil.',
        preparationTime: 30,
        difficulty: 'Medium',
        image: '/uploads/pizza.png',
        category: italianId
      },
      {
        name: 'Pasta Carbonara',
        description: 'Creamy pasta dish with guanciale, eggs, and pecorino cheese.',
        ingredients: ['Spaghetti', 'Eggs', 'Pecorino Romano', 'Guanciale', 'Black pepper'],
        instructions: '1. Boil pasta.\n2. Fry guanciale until crispy.\n3. Mix eggs and cheese.\n4. Toss pasta with guanciale and egg mixture off heat.',
        preparationTime: 20,
        difficulty: 'Medium',
        image: '/uploads/pasta.png',
        category: italianId
      },
      {
        name: 'Sushi Platter',
        description: 'A variety of fresh sushi including nigiri and maki rolls.',
        ingredients: ['Sushi rice', 'Nori', 'Fresh fish (Salmon, Tuna)', 'Avocado', 'Wasabi', 'Soy sauce'],
        instructions: '1. Prepare sushi rice.\n2. Slice fish into thin pieces.\n3. Roll sushi or form nigiri.\n4. Serve with wasabi and soy sauce.',
        preparationTime: 45,
        difficulty: 'Hard',
        image: '/uploads/sushi.png',
        category: asianId
      },
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a molten center, perfect for dessert lovers.',
        ingredients: ['Dark chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour'],
        instructions: '1. Melt chocolate and butter.\n2. Whisk eggs and sugar.\n3. Fold in chocolate mixture and flour.\n4. Bake in ramekins at 400°F for 12 minutes.',
        preparationTime: 25,
        difficulty: 'Easy',
        image: '/uploads/dessert.png',
        category: dessertId
      }
    ]);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
