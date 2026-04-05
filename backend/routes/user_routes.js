import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth_middleware.js';
import { isValidPagination, isValidSorting } from '../middleware/pagination_middleware.js';
import { getUserProfile, updatePassword, updateProfile, getAllUsers } from '../controllers/user_controller.js'; 
const router = express.Router()

router.get("/user", (req, res) => {
    res.json({ message: "Welcome User"});
});


router.get("/profile", verifyToken, getUserProfile);
router.put("/update-password", verifyToken, updatePassword);
router.put("/update-profile", verifyToken, updateProfile);

router.get("/", verifyToken, isAdmin, isValidPagination(), isValidSorting, getAllUsers);

export default router;