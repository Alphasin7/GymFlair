import  express  from 'express';
import reserveEquipment, {create, deleteEquipment, editEquipment, allShowEquipments, showEquipment, showEquipments } from "../controllers/equipController.js";
import { authenticateToken } from "../middleware/authentication.js";
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
          if (err) return cb(err)
    
          cb(null, raw.toString('hex') + path.extname(file.originalname))
        })
      }
  });

const upload = multer({ storage: storage })


const router = express.Router();

router.route("/create").post(authenticateToken, upload.single('image'), create)
router.route('/reserve').post(authenticateToken, reserveEquipment)
router.route("/").get(authenticateToken, showEquipments)
router.route("/all/").get(authenticateToken, allShowEquipments)
router.route("/one").post(authenticateToken, showEquipment)
router.route("/edit").post(authenticateToken, upload.single('image'), editEquipment)
router.route("/delete").post(authenticateToken,deleteEquipment)



export default router;