import { validationResult } from 'express-validator';
import Qrcode from 'qrcode';
import { addCoffe, getCoffeById, getAllCoffes , deleteCoffe , updateCoffe } from '../services/coffeServices.js';
import { db, storage } from '../firebase.js';

export async function addCoffeHandler(req, res) {
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ error: validationResult(req).array() });
    }
  
    if (!req.files || !req.files.menu || !req.files.logo) {
      return res.status(400).json({ error: 'Menu and logo files are required' });
    }
  
    const menuFile = req.files.menu[0]; // Access the first file in the array
    const logoFile = req.files.logo[0]; // Access the first file in the array
  
    const menuBase64 = menuFile.buffer.toString('base64'); // Convert to base64 string
    const logoBase64 = logoFile.buffer.toString('base64'); // Convert to base64 string
  
    try {
      // Upload menu image to Firebase Storage
      const menuFileName = `menus/${Date.now()}-menu.jpg`;
      const menuBuffer = Buffer.from(menuBase64, 'base64');
      const menuStorageFile = storage.file(menuFileName);
      await menuStorageFile.save(menuBuffer, { contentType: menuFile.mimetype });
      const menuURL = `https://storage.googleapis.com/${storage.name}/${menuFileName}`;
  
      // Upload logo image to Firebase Storage
      const logoFileName = `logos/${Date.now()}-logo.jpg`;
      const logoBuffer = Buffer.from(logoBase64, 'base64');
      const logoStorageFile = storage.file(logoFileName);
      await logoStorageFile.save(logoBuffer, { contentType: logoFile.mimetype });
      const logoURL = `https://storage.googleapis.com/${storage.name}/${logoFileName}`;
  
      const coffeData = {
        code_wifi: req.body.code_wifi,
        coffe_responsable: req.body.coffe_responsable,
        num_tel: req.body.num_tel,
        next_payment: req.body.next_payment,
        location: req.body.location,
        coffe_name: req.body.coffe_name,
        description: req.body.description,
        ssid: req.body.ssid,
        wifiType: req.body.wifiType,
        lien_ig: req.body.lien_ig,
        lien_fb: req.body.lien_fb,
        menu: menuURL,
        logo: logoURL,
      };
  
      const newCoffeId = await db.collection('coffes').add(coffeData);
      res.status(201).json({ id: newCoffeId.id, ...coffeData });
    } catch (error) {
      console.error('Error saving coffee details:', error);
      res.status(500).json({ error: 'Error saving coffee details to database' });
    }
  }
  export async function updateCoffeHandler(req, res) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      await updateCoffe(id, updatedData);
      res.status(200).json({ id, ...updatedData });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  export async function deleteCoffeHandler(req, res) {
    try {
      const id = req.params.id;
      await deleteCoffe(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
export async function getOnceHandler(req, res) {
  try {
    const doc = await getCoffeById(req.params.id);
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllHandler(req, res) {
  try {
    const coffes = await getAllCoffes();
    res.status(200).json(coffes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function QrCodesHandler(req, res) {
  const ssid = req.query.ssid;
  const password = req.query.password;
  const wifiType = req.query.type || 'WPA'; // Default to WPA if not provided
  const url = req.query.url || 'http://example.com';

  if (!ssid || !password) {
    return res.status(400).send('SSID and Password are required');
  }

  const wifiQRData = `WIFI:T:${wifiType};S:${ssid};P:${password};;`;
  const urlQRData = url;

  try {
    const wifiQrCodeDataUrl = await Qrcode.toDataURL(wifiQRData);
    const urlQrCodeDataUrl = await Qrcode.toDataURL(urlQRData);
    res.status(200).json({
      wifiQrCode: wifiQrCodeDataUrl,
      urlQrCode: urlQrCodeDataUrl,
    });
  } catch (error) {
    res.status(500).send('Error generating QR codes');
  }
}
