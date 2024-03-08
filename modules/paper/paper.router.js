


import { Router } from "express";
import * as PaperController from './controller/paper.js'
import allowedTo from "../../middleware/allowedTo.js";
import verifyToken from "../../middleware/verifyToken.js";
import * as userRoles from '../../utils/userRoles.js'

const router = Router()


router.post('/add', PaperController.addPaper)
router.get('/show', PaperController.allPaper)
router.delete('/:id', verifyToken,allowedTo(userRoles.ADMIN), PaperController.deletaPaper)
router.put('/:id', verifyToken,allowedTo(userRoles.ADMIN), PaperController.updatePaper)
router.get('/total',PaperController.totalty)
router.get('/getLast',PaperController.getLast)
export default router