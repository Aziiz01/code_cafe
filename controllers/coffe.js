import coffe from '../models/coffe.js';
import { validationResult } from 'express-validator';
import fs from 'fs'
import Qrcode from 'qrcode'



export function addCoffe (req, res){
  
  if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ error: validationResult(req).array() });
  }

  // Check if req.file exists before accessing its properties
  if (!req.files) {
      return res.status(400).json({ error: 'file is required' });
  }
  const menuBase64 = req.files.menu[0].buffer.toString('base64');
  const logoBase64 = req.files.logo[0].buffer.toString('base64');
  // Save the coffee details to the database
  coffe.create({
      code_wifi: req.body.code_wifi,
      coffe_name :req.body.coffe_name,
      description : req.body.description,
      ssid: req.body.ssid,
      wifiType :req.body.wifiType,
      lien_ig: req.body.lien_ig,
      lien_fb: req.body.lien_fb,
      menu: menuBase64, // Save the menu as base64 string
        logo: logoBase64 

  })
  
  .then((newCoffe) => {
      res.status(201).json({
          code_wifi: newCoffe.code_wifi,
          coffe_name : newCoffe.coffe_name,
          description : newCoffe.description,
          ssid : newCoffe.ssid,
          wifiType : newCoffe.wifiType,
          menu: newCoffe.menu,
          logo : newCoffe.logo,
          lien_ig: newCoffe.lien_ig,
          lien_fb: newCoffe.lien_fb
      });
  })
  .catch((err) => {
      res.status(500).json({ error: 'Error saving coffee details to database', err });
  });
};

export function getOnce (req,res){
  coffe
     .findById(req.params.id)
     .then(doc => {
        res.status(200).json(doc)
     })
     .catch( err => {
        res.status(500).json({error: err})
     });
}

export function getAll (req, res){
    coffe.find({})
    .exec()
    .then((games) => {
        res.status(200).json(games);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
}

export async function QrCodes(req, res) {
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
            urlQrCode: urlQrCodeDataUrl
          });       
} catch (error) {
    res.status(500).send('Error generating QR codes');
}
}