import  express  from 'express';
import { login, equipments } from '../controllers/viewController.js'
const router = express.Router();

router.route('/login').get(login)
router.route('/equipments').get(equipments)

export default router;