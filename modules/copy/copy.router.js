import { Router } from "express";
import * as copyController from "./controller/copy.js";
import allowedTo from "../../middleware/allowedTo.js";
import verifyToken from "../../middleware/verifyToken.js";
import * as userRoles from "../../utils/userRoles.js";

const router = Router();

router.post("/addin", copyController.addCopyin);
router.get("/allin", copyController.allCopyin);
router.delete(
  "/allin/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  copyController.deleteCopyin
);
router.delete(
  "/allout/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  copyController.deleteCopyout
);
router.put(
  "/in/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  copyController.updateCopyin
);
router.put(
  "/out/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  copyController.updateCopyout
);
router.post("/addout", copyController.addCopyout);
router.get("/allout", copyController.allCopyout);

export default router;
