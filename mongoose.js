import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        //
            await mongoose.connect("mongodb+srv://aziz:aziz@cluster0.kpv5qcy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
            console.log("Connected to MongoDB");
            return true; 
        //}
        //return false;
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        return false;
    }
}

export default connectMongoDB;