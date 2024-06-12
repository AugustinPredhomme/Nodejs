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
    res.render('posts', {
        posts
    })
}