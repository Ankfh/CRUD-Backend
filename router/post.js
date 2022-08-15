const express = require("express");
const {
  getPostById,
  getAllPost,
  addPost,
  updatePost,
  postDelete,
} = require("../controller/postController");
const router = express.Router();

router.post("/add", addPost);
router.get("/get/:id", getPostById);
router.get("/allpost", getAllPost);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", postDelete);

module.exports = router;
