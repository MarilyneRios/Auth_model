//userRoutes.js
import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
//Pour tester : GET ou PUT + http://localhost:3001/api/users/profile
router
  .route('/profile')
 .get(protect, getUserProfile)
 .put(protect, updateUserProfile);
export default router;