// http://localhost:8000/api

import { Router } from "express";
import postRouter from "./postRoute.js";
import commentRouter from "./commentRoute.js";

const router = Router();

// http://localhost:8000/api/posts
router.use('/posts', postRouter);

// http://localhost:8000/api/comments
router.use("/comments", commentRouter);

export default router;


// SERVER -> ROUTER -> ROUTES (comments/posts) -> CONTROLLERS -> [MODELS] <-> [DATA]