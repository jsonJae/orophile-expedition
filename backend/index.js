import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import connectDB from './config/db_connect.js';
import authRoutes from './routes/auth_routes.js'
import userRoutes from './routes/user_routes.js';
import hikeRoutes from './routes/hike_routes.js';


const PORT = process.env.port || 8000;
const app = express();

// middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hikes', hikeRoutes);

connectDB() 
    .then(() => {
        app.listen(PORT, () => {
        console.log(`[+] Listening to port ${PORT}`);
        });
    })
