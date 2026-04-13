import express from 'express';
import { verifyToken, isAdmin, isUser } from '../middleware/auth_middleware.js';
import { isValidPagination, isValidSorting } from '../middleware/pagination_middleware.js';
import { getUserProfile, updatePassword, updateProfile, deleteAccount, getAllUsers, deleteUser } from '../controllers/user_controller.js'; 
const router = express.Router()

router.get("/user", (req, res) => {
    res.json({ message: "Welcome User"});
});


router.get("/profile", verifyToken, getUserProfile);
router.put("/update-password", verifyToken, updatePassword);
router.put("/update-profile", verifyToken, updateProfile);
router.delete("/", verifyToken, isUser, deleteAccount);

router.get("/", verifyToken, isAdmin, isValidPagination(), isValidSorting, getAllUsers);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;