import express from 'express';
import { verifyToken, isAdmin, isUser } from '../middleware/auth_middleware.js';
import { createBooking, cancelBooking } from '../controllers/booking_controller.js';

const router = express.Router();

router.post('/:hike_id', verifyToken, isUser, createBooking);
router.patch('/:booking_id', verifyToken, isUser, cancelBooking);

export default router;