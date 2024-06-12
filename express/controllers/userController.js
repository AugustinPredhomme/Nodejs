import { APIResponse } from "../utils/response.js";
import { findAllUsers, findUserById, pushUser } from "../models/index.js";
import crypto from "crypto";

export const getAllUsers = (request, response) => {
    const users = findAllUsers();
    APIResponse(response, users, "[GET] Récupérer tout les utilisateurs");
};

export const getUserById = (request, response) => {
    const userId = request.params.userId;
    const user = findUserById(userId);
    if (!user)
        APIResponse(response, null, `L'utilisateur avec l'id ${userId} n'existe pas`, 404);
    else
        APIResponse(response, user, `[GET] Récupérer l'utilisateur avec l'id ${userId}`);
};

export const createUser = (request, response) => {
    const user = request.body;
    user.id = crypto.randomUUID();
    pushUser(user);
    APIResponse(response, null, "[POST] Créer un utilisateur");
};