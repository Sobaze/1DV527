import express from 'express';
import { apiInformation } from '../Controller/apiController.js';


const router = express.Router();

router.get('/', apiInformation);




export default router;