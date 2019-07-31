const express = require ('express');

const server = express();
server.use(express.json())

const db = require('./data/db.js');

server.get('/', (req, res) => {
  res.send('Howdy')
})

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({error: 'The posts information could not be retrieved'}));
});

server.listen(8250, () => console.log('API running on port 8250'));