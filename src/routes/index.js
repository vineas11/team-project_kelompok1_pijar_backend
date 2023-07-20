const express = require("express");
const router = express.Router();
const usersRouter = require("../routes/users");
const recipesRouter = require("../routes/recipes");
const categorysRouter = require("../routes/categorys");
const commentsRouter = require("../routes/comments")

router.use("/users", usersRouter);
router.use("/categorys", categorysRouter);
router.use("/recipes", recipesRouter);
router.use("/comments", commentsRouter)

module.exports = router;
