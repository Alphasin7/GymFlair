import  express  from 'express';
import { authenticateToken } from "../middleware/authentication.js";
import { deleteEvent, editEvent, getEvent, getEvents } from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
import { reserveEvent } from '../controllers/eventController.js';
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

router.route('/').get(authenticateToken, getEvents)
router.route('/create').post(authenticateToken,upload.single('image'), createEvent)
router.route('/join').post(authenticateToken,reserveEvent)
router.route('/one').post(authenticateToken, getEvent)
router.route('/edit').post(authenticateToken, upload.single('image'),editEvent)
router.route('/delete').post(authenticateToken, deleteEvent)


export default router;