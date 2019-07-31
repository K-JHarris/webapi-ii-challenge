const express = require('express')
const router = express.Router()
const db = require('../data/db')

//get all posts
router.get('/', (req, res) => {
  db
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({error: 'The posts information could not be retrieved'}));
});

router.post('/', (req, res) => {
  const { title, contents } = req.body;

  if(!title || !contents){
    res
    .status(400).json({errorMessage: 'Post must contain a title and contents'})
  }
  else {
    db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:'There was an error while saving the post to the database',
        })
      })
  }
})


router.get('/:id', (req, res) => {
  res.status(200).send('hello from the GET /posts/:id endpoint');
});

router.post('/', (req, res) => {
  res.status(200).send('hello from the POST /posts endpoint');
});

module.exports = router;