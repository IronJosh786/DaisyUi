import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/get-user-details").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
