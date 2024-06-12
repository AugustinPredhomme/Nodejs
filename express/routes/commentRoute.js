import { Router } from "express";
import {
  getAllComments,
  createComment,
  getCommentsByPostId,
} from "../controllers/index.js";

const router = Router();

// GET http://localhost/api/comments/[] (récupérer tout les commentaires)
router.get("/", getAllComments);

// GET http://localhost/api/comments/posts/[25] (récupérer le commentaire du post id 25)
router.get("/posts/:postId", getCommentsByPostId);

// POST http://localhost/api/comments/[] (créer un commentaire)
router.post("/", createComment);

export default router;