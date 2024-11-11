import { Router } from 'express';
import { getUsers, createUser, findUser, updateUser, deleteUser } from '../controllers/userController';
import { createUserAdmin } from '../controllers/userAdminController';
import authenticateAdmin from '../middlewares/authenticateAdmin';


const router = Router();

router.get('/',authenticateAdmin, getUsers);
router.post('/',authenticateAdmin, createUser);
router.get('/:id',authenticateAdmin, findUser);
router.put('/:id',authenticateAdmin, updateUser);
router.delete('/:id',authenticateAdmin, deleteUser);
router.post('/admin', createUserAdmin);


export { router };
