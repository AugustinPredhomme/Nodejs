import { findAllPosts } from "../models/index.js";

export const viewHome = (req, res) => {
    res.render('index', {
        title: "Page d'accueil",
        message: "Coucou toi",
        paragraph: "Bienvenue sur ma page d'accueil"
    });
}

export const viewPosts = (req, res) => {
    const posts = findAllPosts();

    const postComments = posts.map(post => {
        const comments = findCommentsByPostId(post.id);
        return {
            ...post,
            comments
        }
    })

    res.render('posts', {
        posts
    })
}