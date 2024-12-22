import express from 'express';
import { validateSendEmail } from '../middleware/validation.js';
import { sendEmail } from '../controllers/sesController.js';

const router = express.Router();

router.post('/send', validateSendEmail, sendEmail);

export { router };