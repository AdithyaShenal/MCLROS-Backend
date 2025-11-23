import express from "express";
import * as userController from "./user.controller.js";
import * as userValidator from "./user.validator.js";
import validate from "../../middleware/validate.js"; // your custom validator middleware
import auth from "../../middleware/auth.js";

const router = express.Router();

// CREATE USER
router.post(
  "/",
  validate(userValidator.createUserSchema),
  userController.createUser
);

// GET CURRENT USER
router.get("/me", auth, userController.getMe);

export default router;
