import multer from 'multer';
import { addCoffeHandler } from '../controllers/coffeController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/coffes', upload.fields([{ name: 'menu', maxCount: 1 }, { name: 'logo', maxCount: 1 }]), addCoffeHandler);
