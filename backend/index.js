import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.port || 8000;
const URI = process.env.mongodb_uri;

const app = express();

app.use(express.json());

mongoose.connect(URI)
    .then(() => {
        console.log('Successfully connected to MongoDB!');

        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT} `);
        });
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message);
        process.exit(1);
    });