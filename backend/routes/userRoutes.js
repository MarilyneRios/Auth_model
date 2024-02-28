import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile} from '../controllers/userController.js';
// La variable protect = fonction middleware:
// qui vérifie si l’utilisateur est authentifié avant d’accéder à certaines routes
//import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
//Parce que les routes commence par /profile 
//Pour tester : GET ou PUT + http://localhost:3001/api/users/profile
router
  .route('/profile')
 // .get(protect, getUserProfile)
 // .put(protect, updateUserProfile);
  .get( getUserProfile)
 .put( updateUserProfile);
export default router;