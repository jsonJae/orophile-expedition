import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import connectDB from './config/db_connect.js';
import cors from 'cors';
import authRoutes from './routes/auth_routes.js'
import userRoutes from './routes/user_routes.js';
import hikeRoutes from './routes/hike_routes.js';
import bookingRoutes from './routes/booking_routes.js';


const PORT = process.env.port || 8000;
const app = express();

app.use(cors());
// middleware
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hikes', hikeRoutes);
app.use('/api/bookings', bookingRoutes);

connectDB() 
    .then(() => {
        app.listen(PORT, () => {
        console.log(`[+] Listening to port ${PORT}`);
        });
    })
