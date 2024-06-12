import { APIResponse } from "../utils/index.js";
import { pushPost, findAllPosts, findPostById, deletePost as deleteP, updatePost as updateP } from "../models/index.js";
import crypto from "crypto";

export const getAllPosts = (request, response) => {
    const posts = findAllPosts();
    APIResponse(response, posts, "[GET] Récupérer tout les posts");
};

export const getPostById = (request, response) => {
    const postId = request.params.postId;
    const post = findPostById(postId);
    if (post)
        APIResponse(response, null, `[GET] Récupérer le post avec l'id ${postId}`);
    else
        APIResponse(response, null, `Le post avec l'id ${postId} n'existe pas`, 404);
};

export const createPost = (request, response) => {
    const newPost = request.body;
    newPost.id = crypto.randomUUID();
    pushPost(newPost);
    APIResponse(response, null, "[POST] Créer un post");
};

export const updatePost = (request, response) => {
    const postId = request.params.postId;
    const update = request.body;
    updateP(postId, update);
    APIResponse(response, null, `[PUT] Modifier le post avec l'id ${postId}`);
};

export const deletePost = (request, response) => {
    const postId = request.params.postId;
    deleteP(postId);
    APIResponse(response, null, `[DELETE] Supprimer le post avec l'id ${postId}`);
};

export const searchPost = (request, response) => {
    const { q } = request.query;
    APIResponse(response, null, `[GET] Recherche de posts avec le terme ${q}`);
};