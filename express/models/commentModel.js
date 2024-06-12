import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // /Users/diyae/express/models/postModel.js
const __dirname = path.dirname(__filename); // /Users/diyae/express/models

const commentsFilePath = path.join(__dirname, '../data/comments.json');

export const findAllComments = () => {
    const data = fs.readFileSync(commentsFilePath, 'utf-8');
    return JSON.parse(data);
}

export const findCommentsByPostId = (postId) => {
    const comments = findAllComments();
    return comments.filter(comment => comment.postId === postId);
}

export const pushComment = (comment) => {
   const comments = findAllComments();
   comments.push(comment);
   fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
}

export const findCommentsByUserId = (userId) => {
    const comments = findAllComments();
    return comments.filter(comment => comment.authorId === userId);
}