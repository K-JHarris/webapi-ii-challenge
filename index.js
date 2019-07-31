const express = require ('express');

const postRoutes = require('./posts/postRoutes');

const server = express();
server.use(express.json())

const db = require('./data/db.js');

server.get('/', (req, res) => {
  res.send('Howdy')
})

server.use('/posts', postRoutes);

server.listen(8250, () => console.log('API running on port 8250'));