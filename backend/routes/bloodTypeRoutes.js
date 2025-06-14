import express from 'express';
import { deleteBloodType, editBloodType, getBloodTypes, newBloodType } from '../controllers/bloodTypeController.js';


const router= express.Router();


router.post('/', newBloodType);
router.get('/', getBloodTypes);
router.put('/:Id', editBloodType);
router.delete('/:Id', deleteBloodType);



export default router;