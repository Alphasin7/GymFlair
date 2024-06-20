import  express  from 'express';
import { authenticateToken } from "../middleware/authentication.js";
import { create, deleteCour, editCour, showCour, showCours, reserveCours } from '../controllers/courController.js';



const router = express.Router();

router.route("/create").post(create)

router.route("/book").post(authenticateToken, reserveCours)
router.route("/one").post(authenticateToken, showCour)

router.route("/").get(authenticateToken ,showCours)


router.route("/edit").post(authenticateToken,editCour)
router.route("/delete").post(authenticateToken,deleteCour)








export default router;