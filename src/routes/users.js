const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const usersController = require("../controller/users");
router
  .post("/register", upload, usersController.registerUsers)
  .post("/login", usersController.loginUsers)
  .get("/profile/:id", usersController.getSelectUsers)
  .get("/profile", usersController.getAllUsers)
  .put("/profile/:id", upload, usersController.updateUsers)
  .delete("/profile/:id", usersController.deleteUsers);
module.exports = router;
