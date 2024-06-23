import { validationResult } from 'express-validator';
import admin from '../models/admin.js';

export function signup(req,res){
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
   
        admin.create({
            email : req.body.email,
            password : req.body.password           
        })
        .then((newadmin) => {
            res.status(201).json({
                "_id" : newadmin.id
            })
        })
        .catch((err) => {
            console.error('Error creating admin:', err);
            res.status(500).json(err);
        });
    
}

export async function login(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    } else {
        const { email, password } = req.body;
        console.log(req.body)
        try {
            const admin = await admin.findOne({ email });

            if (!admin) {
                return res.status(404).json({ error: 'admin not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Password is invalid' });
            }

            const accessToken = jwt.sign(
                { adminId: admin._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.status(200).json({ admin, accessToken });
        } catch (err) {
            console.error(err); 
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}