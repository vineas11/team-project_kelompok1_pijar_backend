const express = require("express");
const router = express.Router();
const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipesRouter");
const categorysRouter = require("../routes/categorys");

router.use("/users", usersRouter);
router.use("/categorys", categorysRouter);
router.use("/recipes", recipesRouter);

module.exports = router;
