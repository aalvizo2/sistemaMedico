import express from 'express';
import {getAllUsers, createUser, editUser, toggleUserState, getAllDeletedUsers, activateUser, getUserByName} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', editUser); 
router.delete('/:Id', toggleUserState);
router.get('/deletedUsers', getAllDeletedUsers);
router.post('/state/:Id', activateUser);
router.get('/userId/:Name', getUserByName);

export default router;