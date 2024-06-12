import { Router } from "express";
import { getAllUsers, createUser, getUserById } from "../controllers/index.js";

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);

export default router;