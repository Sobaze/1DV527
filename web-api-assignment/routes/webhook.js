import express from 'express';

const router = express.Router();

import { createWebhook, displayWebhooks, sendWebhook, deleteWebhook } from '../Controller/webhookController.js';
import { verifyToken }  from '../Controller/tokenVerifyController.js';

router.post('/', verifyToken, createWebhook);
router.get('/', verifyToken, displayWebhooks);
router.post('/view-latest-sightings', verifyToken, sendWebhook);
router.delete('/:id', verifyToken, deleteWebhook);


export default router;