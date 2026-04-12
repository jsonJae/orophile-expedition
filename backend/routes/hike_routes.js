import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth_middleware.js';
import { getAllHikes, createHike, getHike, deleteHike, updateHike } from '../controllers/hike_controller.js';
const router = express.Router();

router.get('/', getAllHikes );
router.get('/:id', getHike );
router.put('/:id', verifyToken, isAdmin, updateHike );
router.delete('/:id', verifyToken, isAdmin, deleteHike);
router.post('/', verifyToken, isAdmin, createHike );



export default router;  