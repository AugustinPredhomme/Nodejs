import { Router } from "express";
import { viewHome, viewPosts } from "../controllers/viewController.js";

const router = Router();

router.get('/', viewHome);
router.get('/posts', viewPosts);

export default router;