import { Router } from "express";
import * as gearController from './controller/gear.js'
import verifyToken from "../../middleware/verifyToken.js";
import allowedTo from "../../middleware/allowedTo.js";
import * as userRoles from '../../utils/userRoles.js'

const router = Router()

router.post('/addfar3', verifyToken,allowedTo(userRoles.ADMIN), gearController.addFar3)
router.get('/allfar3', gearController.allFar3)
router.delete('/far3/:id',verifyToken,allowedTo(userRoles.ADMIN), gearController.deleteFar3)
router.put('/far3/:id',verifyToken,allowedTo(userRoles.ADMIN),gearController.updateFar3)


router.post('/addsarfpaper',verifyToken,allowedTo(userRoles.ADMIN), gearController.sarfPaper)
router.get('/allsarfpaper', gearController.allSarfPaper)

export default router