import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db_connect.js';
import authRoutes from './routes/auth_route.js'
dotenv.config();

const PORT = process.env.port || 8000;
const app = express();

// middleware
app.use(express.json());

app.use('/api/auth', authRoutes)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`[+] Listening to port ${PORT}`);
        });
    })
