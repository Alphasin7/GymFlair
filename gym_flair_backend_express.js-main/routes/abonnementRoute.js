import  express  from 'express';
import { authenticateToken } from "../middleware/authentication.js";
import { create, deleteAbonnement, editAbonnement, showAbonnement, showAbonnements } from '../controllers/abonnementController.js';



const router = express.Router();

router.route("/create").post(authenticateToken,create)
router.route("/:id").get(showAbonnement)

router.route("/").get(showAbonnements)


router.route("/:id").put(authenticateToken,editAbonnement)
router.route("/:id").delete(authenticateToken,deleteAbonnement)








export default router;