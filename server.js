/* 
//Exo 1
import http from 'http';

const handleHome = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bienvenue à la page d\'accueil');
};

const handleAbout = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('À propos de nous');
};

const handleData = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Route /data atteinte' }));
};

const handleNotFound = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page non trouvée');
};

const handlePostSubmit = (req, res) => {
  const data = req.body;
  console.log('Données reçues:', data);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Données reçues avec succès' }));
};

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/':
      handleHome(req, res);
      break;
    case '/about':
      handleAbout(req, res);
      break;
    case '/data':
      handleData(req, res);
      break;
    case '/submit':
      handlePostSubmit(req, res);
      break;
    default:
      handleNotFound(req, res);
  }
});

server.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
*/

//Exo 2
/*
import express from "express";
const app = express();

const PORT = 8000;

let tasks = [];

// Route get pour récupérer toutes les tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Route post pour créer une nouvelle tâche
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: Date.now().toString(),
    }
    tasks.push(newTask);
    res.json(newTask);
});

// Route put pour modifier une tâche par son ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.title = Date.now().toString();
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Route delete pour supprimer une tâche par son ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);
    if (tasks.length < taskLength) {
        res.json({ message: 'Task deleted' });
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/

import express from "express";
import helmet from "helmet";

import router from "./routes/index.js";

import { PORT } from "./config/index.js";
import { requestLogger, errorHandler } from "./middlewares/index.js";

// API RESTful = Representational State Transfer

const app = express();

// utilisation du mw express.json() pour analyser les body des requêtes en json
app.use(express.json()); // le payload (le body) de la requete sera accessible depuis req.body

/*
    app.METHOD(path, callback);

    CRUD => Create Read Update Delete
    URI => Uniform Resource Identifier  + Methode HTTP (get, post delete etc)
*/

app.use(helmet())
app.use(requestLogger);

// http://localhost:8000/api
app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});