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
