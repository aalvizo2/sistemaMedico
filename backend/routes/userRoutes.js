import express from 'express';
import {getAllUsers, createUser, editUser, toggleUserState, getAllDeletedUsers, activateUser, getUserByName} from '../controllers/userController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', upload.single('photo') ,createUser);
router.put('/:id', editUser); 
router.delete('/:Id', toggleUserState);
router.get('/deletedUsers', getAllDeletedUsers);
router.post('/state/:Id', activateUser);
router.get('/userId/:Name', getUserByName);

export default router;