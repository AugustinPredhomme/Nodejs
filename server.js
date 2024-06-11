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

/*
//Exo 2
import { createServer } from 'http';

const PORT = 8000;

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.method === "GET") {

        if (request.url === "/") {
            response.statusCode = 200;
            response.end(JSON.stringify({ message: "Bienvenue à la page d'accueil !" }));
        }

        else if (request.url === "/about") {
            response.statusCode = 200;
            response.end(JSON.stringify({ message: "À propos de nous" }));
        }

        else if (request.url === "/data") {
            response.statusCode = 200;
            response.end(JSON.stringify({ message: "La route /data a été atteinte" }));
        }

        else {
            response.statusCode = 404;
            response.end(JSON.stringify({ message: "Page not found" }));
        }

    } else if (request.method === "POST") {
        let body = '';
        if (request.url === "/submit") {

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                response.statusCode = 200;
                response.end(JSON.stringify({ message: `Données reçues !`, body }));
            })
        }

        else {
            response.statusCode = 404;
            response.end(JSON.stringify({ message: "Page not found" }));
        }

    } else {
        response.statusCode = 405;
        response.end(JSON.stringify({ message: "Method not allowed" }));
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
*/