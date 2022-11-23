import express from 'express';
// import { v4 as uuidv4 } from 'uuid';

import { getUsers, createUsers, getUserWithID, deleteUser, updateUser } from '../Controller/userController.js';

const router = express.Router();

router.get('/', getUsers)
router.post('/', createUsers );
router.get('/:id', getUserWithID);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);



export default router; 