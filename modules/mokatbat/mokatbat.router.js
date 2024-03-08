import { Router } from "express";
import * as mokatbatController from "./controller/mokatbat.js";
import { myMulter, HME, multerValidation } from "../../services/multer.js";
import { mokatbatModel } from "../../DB/model/mokatbat.model.js";
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from "../../utils/userRoles.js";
const router = Router();
// myMulter('المكاتبات/صور',multerValidation.image).array('image',10)
router.post(
  "/pic/:id",
  myMulter("المكاتبات/صور", multerValidation.image).array("image", 10),
  HME,
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!req.files) {
        return res.status(400).json({ message: "plz upload mokatba image" });
      } else {
        const imageUrls = [];
        // const imgUrl = req.file.destination + '/' + req.file.filename
        for (const file of req.files) {
          imageUrls.push(file.destination + "/" + file.filename);
        }
        // await mokatbatModel.updateOne({mokatbaImgs:imgUrl})
        const mokatba = await mokatbatModel.findOneAndUpdate(
          { _id: id },
          { mokatbaImgs: imageUrls },
          { new: true }
        );
        return res.status(200).json({ message: "Done", mokatba });
      }
    } catch (error) {
      return res.json({ message: "ERR", error });
    }
  }
);

router.get("/pic/:id", mokatbatController.getMokatbaByID);
router.post(
  "/category/add",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  mokatbatController.addCategory
);
router.get("/category/all", mokatbatController.allCategory);
router.delete(
  "/category/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  mokatbatController.deleteCategory
);
router.put(
  "/category/:id",
  verifyToken,
  allowedTo(userRoles.ADMIN),
  mokatbatController.updateCategory
);

router
  .route("/")
  .get(mokatbatController.allMokatbat)
  .post(mokatbatController.addMokatba);

router
  .route("/:id")

  .put(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    mokatbatController.updateMokatbat
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    mokatbatController.deletaMokatbat
  );
export default router;
