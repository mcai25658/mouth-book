import express from 'express';
import { activateAccount } from '../controllers/userController.js';

const router = express.Router();

router.route('/activate').get(activateAccount);

export default router;
