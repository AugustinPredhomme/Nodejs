import fs from 'fs';
import path from 'path';

// On récupére notre chemin vers le fichier posts.json
// (__dirname = chemin du fichier actuel à savoir postModel.js)
const postFilePath = path.join(__dirname, '../data/posts.json');

// Action CRUD => récupérer tout les posts
export const findAllPosts = () => {
    const data = fs.readFileSync(postFilePath, 'utf-8');
    return JSON.parse(data);
};

// Action CRUD => récupérer un post en fonction de son id
export const findPostById = (id) => {
    const posts = findAllPosts();
    return posts.find(post => post.id === id);
};

// Action CRUD => création d'un post
export const pushPost = (post) => {
    const posts = findAllPosts();
    posts.push(post);
    fs.writeFileSync(postFilePath, JSON.stringify(posts, null, 2));
}

// Action CRUD => mise à jour d'un post
export const updatePost = (id, post) => {
    const posts = findAllPosts();
    const index = posts.findIndex(p => p.id === id);
    posts[index] = post;
    fs.writeFileSync(postFilePath, JSON.stringify(posts, null, 2));
};

// Action CRUD => suppression d'un post
export const deletePost = (id) => {
    const posts = findAllPosts();
    const index = posts.findIndex(p => p.id === id);
    posts.splice(index, 1);
    fs.writeFileSync(postFilePath, JSON.stringify(posts, null, 2));
};