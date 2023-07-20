const express = require("express");
const router = express.Router();
const uploadRecipes = require("../middlewares/uploadRecipes");
const recipesController = require("../controller/recipes");

router
  .get("/", recipesController.getAllRecipes)
  .get("/:users_id", recipesController.getRecipesByUserId)
  .post("/", uploadRecipes, recipesController.insertRecipes)
  .put("/:id", uploadRecipes, recipesController.updateRecipe)
  .delete("/:id", recipesController.deleteRecipe);

module.exports = router;
