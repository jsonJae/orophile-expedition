import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`[+] Database connected to: ${connect.connection.host}\n[+] Collection Name: ${connect.connection.name}`);

    }catch(error){
        console.log(error);
        process.exit(1);
    }
    
};

export default connectDB;