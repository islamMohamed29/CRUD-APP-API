import verifyToken from "../../middleware/verifyToken.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import * as authController from "./controller/registration.js";
import { Router } from "express";
const router = Router();

router.post(
  "/register",
  myMulter("Profile", multerValidation.image).single("avatar"),
  HME,
  authController.register
);
router.get("/users", verifyToken, authController.getAllUsers);
router.post("/login", authController.login);

export default router;
