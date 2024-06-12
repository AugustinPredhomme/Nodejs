// http://localhost:8000/api

import { Router } from "express";
import postRouter from "./postRoute.js";

const router = Router();

// http://localhost:8000/api/posts
router.use('/posts', postRouter);


// http://localhost:8000/api/comments
// router.get("/comments", commentsRouter);

export default router;