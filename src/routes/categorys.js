const express = require("express");
const router = express.Router();
const categorysController = require("../controller/categorys");
router
  .get("/", categorysController.getAllCategorys)
  .get("/:id", categorysController.getSelectCategorys)
  .post("/", categorysController.insertCategorys)
  .put("/:id", categorysController.updateCategorys)
  .delete("/:id", categorysController.deleteCategorys);
module.exports = router;
