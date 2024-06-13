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


//J3
import express from "express";
import helmet from "helmet";
import path from "path";
import fs from 'fs';

import router from "./routes/index.js";
import viewRouter from './routes/viewRoute.js';

import { PORT } from "./config/index.js";
import { requestLogger, errorHandler } from "./middlewares/index.js";

// API RESTful = Representational State Transfer

const app = express();

// utilisation du mw express.json() pour analyser les body des requêtes en json
app.use(express.json()); // le payload (le body) de la requete sera accessible depuis req.body
app.use(express.urlencoded({ extended: true })); // lorsque le payload est de type form-data-urlencoded (formulaire)


app.set('view engine', 'ejs'); // Configurer express pour utiliser EJS comme moteur de vue
app.set('views', path.join(process.cwd(), 'views')) // définir le répertoire où sont stockées nos fichiers de vues (views)

// définir le répertoire où sont stockées nos fichiers statiques (css, js, images, etc) pour nos vues ejs
app.use(express.static(path.join(process.cwd(), 'public')));


/*
    app.METHOD(path, callback);

    CRUD => Create Read Update Delete
    URI => Uniform Resource Identifier  + Methode HTTP (get, post delete etc)
*/

app.use(helmet())
app.use(requestLogger);

// http://localhost:8000/api
app.use('/api', router);

// http://localhost:8000/
app.use('/', viewRouter);

app.get('/video', (req, res) => {
  const range = req.headers.range;
  if(!range) {
    return res.status(400).send('Range Header is required');
  }

  //On récupère le chemin du fichier
  const path = "./uploads/video.mp4";
  
  //Et sa taille en bytes
  const size = fs.statSync(path).size;
  
  //Content-Range : header dans la réponse
  //Content-Range : <unit> <range-start>-<range-end>/<size>
  const start = Number(range.replace(/\D/g, ''));

  const part = 1*1e6; //1MB

  const end = Math.min(start + part, size - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${size}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4"
  }

  res.writeHead(206, headers);

  const stream = fs.createReadStream(path, {start, end});
  
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});