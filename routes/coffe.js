import express from 'express';
import { addCoffeHandler, getOnceHandler, getAllHandler, QrCodesHandler, updateCoffeHandler, deleteCoffeHandler } from '../controllers/coffeController.js';
import multer from 'multer';
import { updateCoffe } from '../services/coffeServices.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/coffes', upload.fields([{ name: 'menu', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), addCoffeHandler);
router.get('/coffes/:id', getOnceHandler);
router.put('/coffes/update/:id', updateCoffeHandler);
router.delete('/coffes/delete/:id', deleteCoffeHandler);
router.get('/coffes', getAllHandler);
router.get('/qrcodes', QrCodesHandler);

export default router;






// import express from 'express';
// import multer from '../middlewares/multer-config.js';
// import { addCoffe, getAll, getOnce, QrCodes } from '../controllers/coffeController.js';
// import upload from '../middlewares/upload.js';
// const router = express.Router();

// router
//   .route('/')
//   .get(getAll)
//   .post(upload.fields([{ name: 'menu', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), addCoffe);

// router
//   .route('/:id')
//   .get(getOnce);
  
// router
// .route('/qr')
// .post(QrCodes);

  
// export default router;