import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const {Schema, model} = mongoose;
const adminSchema = new Schema({
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    }   
});
adminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  });
export default model('Admin', adminSchema);