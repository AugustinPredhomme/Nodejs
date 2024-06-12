import { APIResponse } from "../utils/index.js";

export const getAllPosts = (request, response) => {
    APIResponse(response, null, '[GET] Récupérer tout les posts');
}

export const getPostById = (request, response) => {
    const postId = request.params.postId;
    APIResponse(response, null, `[GET] Récupérer le post avec l'id ${postId}`);
};

export const createPost = (request, response) => {
    APIResponse(response, null, '[POST] Créer un post');
};

export const updatePost = (request, response) => {
    const postId = request.params.postId;
    APIResponse(response, null, `[PUT] Modifier le post avec l'id ${postId}`);
}

export const deletePost = (request, response) => {
    const postId = request.params.postId;
    APIResponse(response, null, `[DELETE] Supprimer le post avec l'id ${postId}`);
}

export const searchPost = (request, response) => {
    const { q } = request.query;
    APIResponse(response, null, `[GET] Recherche de posts avec le terme ${q}`);
}