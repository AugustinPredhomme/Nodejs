import { APIResponse } from "../utils/index.js";
import crypto from "crypto";

export const getAllComments = (request, response) => {
    APIResponse(response, null, '[GET] Récupérer tout les commentaires');
};

export const getCommentsByPostId = (request, response) => {
    const postId = request.params.postId;
    APIResponse(response, null, `[GET] Récupérer les commentaires du post avec l'id ${postId}`);
};

export const createComment = (request, response) => {
    const newComment = request.body;
    newComment.id = crypto.randomUUID();
    APIResponse(response, null, '[POST] Créer un commentaire');
};