import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const coffeSchema = new Schema({
    coffe_name : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    code_wifi : {
        type : String,
        required: true
    },
    ssid : {
        type : String,
        required: true
    },
    wifiType : {
        type : String,
        required: true
    },
    logo: { type: String, required: true }, 

    menu: {
        type: String,
        required: true
    },
    lien_ig: {
        type: String,
        required: true
    },
    lien_fb: {
        type: String,
        required: true
    },
   
});

export default model('Coffe', coffeSchema);