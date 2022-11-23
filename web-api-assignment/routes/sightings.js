import express from 'express';

import { getAllSightings, createSightingsForUser, getSightingPostWithID, deleteSightingPost, updateSightningPost } from '../Controller/sightingsController.js';

import { verifyToken }  from '../Controller/tokenVerifyController.js';
import { loginAuth } from '../Controller/authController.js';

const router = express.Router();

router.get('/', verifyToken, getAllSightings);
router.post('/', verifyToken, createSightingsForUser);
router.get('/:id', verifyToken, getSightingPostWithID);
router.delete('/:id', verifyToken, deleteSightingPost);
router.patch('/:id', verifyToken, updateSightningPost);

export default router;