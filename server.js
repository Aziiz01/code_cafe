import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import http from 'http';
import coffeRoutes from './routes/coffe.js';
import Qrcode from 'qrcode';
import dotenv from 'dotenv';
import adminRoutes from './routes/admin.js';
import './firebase.js';  
// import multer from './middlewares/multer-config.js';

const app = express();
const port = process.env.PORT || 9090;

dotenv.config();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
// app.use(multer());

// Routes
app.use('/coffe', coffeRoutes);
app.use('/admin', adminRoutes);

const server = http.createServer(app);

// Start the server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

  
  
  // Endpoint to generate the Wi-Fi QR code
  /*
  app.get('/generate-combined-qr', async (req, res) => {
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
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Combined QR Code</title>
            </head>
            <body>
                <h1>Scan to Connect to Wi-Fi and Visit a URL</h1>
                <p>1. Scan this QR code to connect to the Wi-Fi:</p>
                <img src="${wifiQrCodeDataUrl}" alt="WiFi QR Code" />
                <p>2. Then scan this QR code to visit the website:</p>
                <img src="${urlQrCodeDataUrl}" alt="URL QR Code" />
            </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send('Error generating QR codes');
    }
  });
  
  
  // Serve the landing page
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
  // Auto-redirect page to the main landing page after connecting to Wi-Fi
  app.get('/redirect', (req, res) => {
    res.sendFile(__dirname + '/public/redirect.html');
  });
  */