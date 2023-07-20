const express = require("express");
const router = express.Router();
const commentsController = require("../controller/comments");
router
  .get("/", commentsController.getAllComments )
  .get("/:id", commentsController.getSelectComments )
  .post("/", commentsController.insertcomments )
  .put("/:id", commentsController.updateComments )
  .delete("/:id", commentsController.deleteComments );
module.exports = router;
