const User = require("../models/User");
const userService = require("../service/user");
const Error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */
  try {
    const users = await userService.findUsers();
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    // TODO: have to delete password from user
    res.status(200).json(user);
  } catch (e) {
    Error("User not found", 400);
  }
};

const postUser = (req, res, next) => {};

const putUserId = (req, res, next) => {};

const patchUserById = (req, res, next) => {};

const deleteUserById = (req, res, next) => {};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserId,
  patchUserById,
  deleteUserById,
};
