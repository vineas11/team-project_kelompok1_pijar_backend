const express = require("express");
const router = express.Router();
const uploadUsers = require("../middlewares/uploadUsers");
const usersController = require("../controller/users");
router
  .post("/register", uploadUsers, usersController.registerUsers)
  .post("/login", usersController.loginUsers)
  .get("/profile/:id", usersController.getSelectUsers)
  .get("/profile", usersController.getAllUsers)
  .put("/profile/:id", uploadUsers, usersController.updateUsers)
  .put("/password/:id", uploadUsers, usersController.updatePasswordUsers)
  .delete("/profile/:id", usersController.deleteUsers);
module.exports = router;
