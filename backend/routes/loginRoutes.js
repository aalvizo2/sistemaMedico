import express from 'express';
import { createUser, loginUser } from '../controllers/loginController.js';
import { getAllUsers } from '../controllers/loginController.js';



const router= express.Router();

//Ruta del login
router.post('/', loginUser);
router.post('/User', createUser);
router.get('/User', getAllUsers);


export default router;