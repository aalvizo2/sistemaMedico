import express from 'express';
import { loginUser } from '../controllers/loginController.js';



const router= express.Router();

//Ruta del login
router.post('/', loginUser);


export default router;