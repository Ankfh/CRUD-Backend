const express = require("express");
const router = express.Router();
// const upload = require("../helper/upload");
const {
  userSignin,
  userSignup,
  userDelete,
  getById,
  getAllUser,
  updateUser,
  passwordReset,
} = require("../controller/user");

router.post("/register", userSignup);
router.post("/login", userSignin);
router.delete("/delete/:id", userDelete);
router.get("/:id", getById);
router.get("/", getAllUser);
router.put("/update/:id", updateUser);
router.put("/reset", passwordReset);

module.exports = router;
