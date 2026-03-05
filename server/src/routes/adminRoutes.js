import { Router } from 'express';
import {
  createSubAdmin,
  getAdminOverview,
  listAdmins,
} from '../controllers/adminController.js';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.use(authenticate);
router.get('/overview', authorizeRoles('super_admin', 'sub_admin'), getAdminOverview);
router.get('/users', authorizeRoles('super_admin'), listAdmins);
router.post('/sub-admins', authorizeRoles('super_admin'), createSubAdmin);

export default router;
