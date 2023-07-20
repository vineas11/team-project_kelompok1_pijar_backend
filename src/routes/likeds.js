const express = require("express");
const router = express.Router();
const likedsController = require("../controller/likeds");
router
  .get("/", likedsController.getAllLikeds)
  .get("/:users_id", likedsController.getSelectLikeds)
  .post("/", likedsController.insertLikeds)
  .put("/:id", likedsController.updateLikeds)
  .delete("/:id", likedsController.deleteLikeds);
module.exports = router;
