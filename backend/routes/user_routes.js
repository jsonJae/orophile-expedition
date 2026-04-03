import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth_middleware.js';
import { getUserProfile, updatePassword, updateProfile } from '../controllers/user_controller.js'; 
const router = express.Router()

router.get("/user", (req, res) => {
    res.json({ message: "Welcome User"});
});


router.get("/user/profile", verifyToken, getUserProfile);
router.put("/update-password", verifyToken, updatePassword);
router.put("/update-profile", verifyToken, updateProfile);

router.get("/admin", verifyToken, isAdmin, (req, res) => {
    res.json({ message: "Welcome Admin"});
});

export default router;