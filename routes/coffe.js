import express from 'express';
import multer from '../middlewares/multer-config.js';
import { addCoffe, getAll, getOnce, QrCodes } from '../controllers/coffe.js';
import upload from '../middlewares/upload.js';
const router = express.Router();

router
  .route('/')
  .get(getAll)
  .post(upload.fields([{ name: 'menu', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), addCoffe);

router
  .route('/:id')
  .get(getOnce);
  
router
.route('/qr')
.post(QrCodes);

  
export default router;