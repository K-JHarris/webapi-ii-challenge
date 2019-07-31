const express = require ('express');

const postRoutes = require('./posts/postRoutes');

const server = express();
server.use(express.json())

const db = require('./data/db.js');

server.get('/', (req, res) => {
  res.send('Howdy')
})

server.use('/posts', postRoutes);

// server.post('/api/posts', (req, res) => {
//   const { title, contents } = req.body;

//   if(!title || !contents){
//     res
//     .status(400).json({errorMessage: 'Post must contain a title and contents'})
//   }
//   else {
//     db.insert(req.body)
//       .then(db => {
//         res.status(201).json(db);
//       })
//       .catch(() => {
//         res.status(500).json({
//           errorMessage:'There was an error while saving the post to the database',
//         })
//       })
//   }
// })

// //get all posts
// server.get('/api/posts', (req, res) => {
//   db
//     .find()
//     .then(posts => res.status(200).json(posts))
//     .catch(err => res.status(500).json({error: 'The posts information could not be retrieved'}));
// });

server.listen(8250, () => console.log('API running on port 8250'));