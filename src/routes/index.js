const express = require("express");
const router = express.Router();
const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipesRouter");

router.use("/users", usersRouter);
router.use("/recipes", recipesRouter);

module.exports = router;
