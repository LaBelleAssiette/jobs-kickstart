const db = require('../models');
const Ingredient = db.ingredient;

exports.addIngredient = async (req, res) => {
  const ingredient = new Ingredient(req.body);
  let result;

  ingredient.validate(async (err) => {
    if (err) {
      console.log(err._message);
      return res.status(422).json(err._message);
    }
    try {
      ingredient.date = new Date().toISOString();
      result = await ingredient.save();
      console.log('Ingredient added');
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
};

exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({}).sort({_id: -1});
    console.log('All ingredients fetched');
    res.status(200).json(ingredients);
  } catch (e) {
    console.log(e);
    res.status(404).json(e);
  }
};

exports.updateIngredient = async (req, res) => {
  const {name, quantity} = req.body;
  let ingredient;
  let updatedIngredient;

  try {
    ingredient = await Ingredient.findOne({_id: req.params.id});
    if (!ingredient) return res.status(404).json({});

    if (name) ingredient.name = name;
    if (quantity || quantity == 0) ingredient.quantity = quantity;

    updatedIngredient = await ingredient.save();
    console.log('Ingredient updated');
    res.status(200).json(updatedIngredient);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    const result = await Ingredient.deleteOne({_id: req.params.id});
    if (result.n > 0) {
      console.log('Ingredient deleted');
      res.status(200).json({message: 'Deleted'});
    } else {
      res.status(401).json('Error');
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.deleteAllIngredients = async (req, res) => {
  try {
    await Ingredient.deleteMany({});
    res.status(200).json({message: 'All ingredients have been deleted'});
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
