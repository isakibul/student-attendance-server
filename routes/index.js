const router = require("express").Router();
const authRoutes = require("./auth");
const userRoutes = require("../routes/users");
const authenticate = require("../middleware/authenticate");

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", authenticate, userRoutes);

module.exports = router;
