import express from 'express';

import { loginAuth } from '../Controller/authController.js';

const router = express.Router();

router.post('/', loginAuth);

export default router;