const express = require("express");
const router = express.Router();
const bookmarksController = require("../controller/bookmarks");
router
  .get("/", bookmarksController.getAllBookmarks)
  .get("/:users_id", bookmarksController.getSelectBookmarks)
  .post("/", bookmarksController.insertBookmarks)
  .put("/:id", bookmarksController.updateBookmarks)
  .delete("/:id", bookmarksController.deleteBookmarks);
module.exports = router;
