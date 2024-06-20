import  express  from 'express';
import { authenticateToken } from "../middleware/authentication.js";
import { create, deleteAbonner, editAbonner, showAbonner } from '../controllers/abonnerController.js';



const router = express.Router();

router.route("/create").post(authenticateToken,create)
router.route("/:id").get(showAbonner)

router.route("/:id").put(authenticateToken,editAbonner)
router.route("/:id").delete(authenticateToken,deleteAbonner)








export default router;