const router = require("express").Router();
const userController = require("../controller/users");

/**
 * Get user by id or email
 */
router.get("/:userId", userController.getUserById);

/**
 * Update user by id
 */
router.put("/:userId", () => {});

/**
 * Update user by id
 */
router.patch("/:userId", () => {});

/**
 * Delete user by id
 */
router.delete("/:userId", () => {});

/**
 * Get all users
 * filter
 * sort
 * pagination
 * select properties
 * @method get
 * @route api/v1/users?sort=["by", "name"]
 * @visibility private
 */
router.get("/", userController.getUsers);

/**
 * Create a new user
 */
router.post("/", () => {});

module.exports = router;
