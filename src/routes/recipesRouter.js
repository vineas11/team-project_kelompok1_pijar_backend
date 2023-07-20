const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const recipesController = require("../controller/recipes");

router
  .get("/", recipesController.getAllRecipes)
  .get("/:id_user", recipesController.getRecipesByUserId)
  .post("/", upload, recipesController.insertRecipes)
  .put("/:id", upload, recipesController.updateRecipe)
  .delete("/:id", recipesController.deleteRecipe);

module.exports = router;
