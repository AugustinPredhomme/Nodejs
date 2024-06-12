import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { findCommentsByUserId } from './commentModel.js';
import { findPostsByUserId } from './postModel.js';

const __filename = fileURLToPath(import.meta.url); // /Users/diyae/express/models/postModel.js
const __dirname = path.dirname(__filename); // /Users/diyae/express/models

const userFilePath = path.join(__dirname, '../data/users.json');

export const findAllUsers = () => {
    const data = fs.readFileSync(userFilePath, 'utf-8');
    return JSON.parse(data);
};

export const findUserById = (id) => {
    const users = findAllUsers();
    const user = users.find(user => user.id === id);
    if (!user)
        return null;
    user.posts = findPostsByUserId(user.id);
    user.comments = findCommentsByUserId(user.id);
    return user;
};

export const pushUser = (user) => {
    const users = findAllUsers();
    users.push(user);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
}