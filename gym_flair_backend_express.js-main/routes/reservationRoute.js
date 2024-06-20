import  express  from 'express';
import { authenticateToken } from "../middleware/authentication.js";
import { create, deleteReservation, editReservation, showReservation } from '../controllers/reservationController.js';



const router = express.Router();

router.route("/create").post(authenticateToken,create)
router.route("/:id").get(showReservation)



router.route("/:id").put(authenticateToken,editReservation)
router.route("/:id").delete(authenticateToken,deleteReservation)








export default router;