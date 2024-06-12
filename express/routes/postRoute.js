import { Router } from "express";

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPost,
} from "../controllers/index.js";

const router = Router();

// GET http://localhost/api/posts/[] (récupérer tout les posts)
router.get("/", getAllPosts);

// GET http://localhost/api/posts/[25] (récupérer le post avec l'id 25)
router.get("/:postId", getPostById);

// POST http://localhost/api/posts/[] (créer un post)
router.post("/", createPost);

// PUT http://localhost/api/posts/[25] (modifier le post avec l'id 25)
router.put("/:postId", updatePost);

// DELETE http://localhost/api/posts/[25] (supprimer le post avec l'id 25)
router.delete("/:postId", deletePost);

// GET http://localhost/api/posts/search?q=lorem&sort=asc&limit=10&offset=0&fields=title,author&date=2021-01-01 (recherche de posts)
router.get('/search', searchPost);

export default router;