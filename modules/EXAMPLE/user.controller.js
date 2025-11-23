import * as userService from "./user.service.js";

export async function createUser(req, res, next) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const user = await userService.getUserById(req.user._id);
    return res.json(user);
  } catch (err) {
    next(err);
  }
}
