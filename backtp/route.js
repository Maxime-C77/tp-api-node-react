const express = require("express");
const router = express.Router();
const authMiddleware = require("./Middleware/authMiddleware");

const {
  Register,
  Login,
  updateUser,
  deleteUser,
  getUsers,
} = require("./Controllers/userController");

const {
    addAnnonce,
    deleteAnnonce,
    updateAnnonce,
    getAnnonces,
    getAnnonceByUserId,
} = require("./Controllers/annonceController");

router.post("/register", Register);
router.post("/login", Login);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete/:id", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);

router.post("/annonce", authMiddleware, addAnnonce);
router.post("/annonce/:userId", getAnnonceByUserId);
router.put("/annonce/:annonceId", authMiddleware, updateAnnonce);
router.delete("/annonce/:annonceId", authMiddleware, deleteAnnonce);
router.get("/annonces", authMiddleware, getAnnonces);

module.exports = router;