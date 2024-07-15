import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../firebase.js'

export async function signup(req, res) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
    const newAdmin = {
      email: req.body.email,
      password: hashedPassword,
    };
  
    const response = await db.collection('admins').add(newAdmin);
    return res.status(200).json(response.id);
  }


export async function login(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  } else {
    const { email, password } = req.body;
    console.log(req.body);

    try {
      const adminRef = db.collection('admins').where('email', '==', email);
      const snapshot = await adminRef.get();

      if (snapshot.empty) {
        return res.status(404).json({ error: 'Admin not found' });
      }

      let admin;
      snapshot.forEach(doc => {
        admin = doc.data();
        admin.id = doc.id;
      });

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Password is invalid' });
      }

      const accessToken = jwt.sign(
        { adminId: admin.id },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.status(200).json({ admin, accessToken });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
