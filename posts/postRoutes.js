const express = require("express");
const router = express.Router();
const db = require("../data/db");

//create a comment for a post with a specified id
router.post("/:id/comments", (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  console.log(commentInfo);
  if (!req.body.text) {
    res.status(400).json({ errorMessage: "Comment missing required field" });
  } else {
    db.insertComment(commentInfo)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  }
});
//create new post
router.post("/", (req, res) => {
  const { title, contents } = req.body;

  if (!title || !contents) {
    res
      .status(400)
      .json({ errorMessage: "Post must contain a title and contents" });
  } else {
    db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the post to the database"
        });
      });
  }
});
//get all posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved" })
    );
});
//get post by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: `The posts information could not be retrieved ${err}` })
    );
});
//get all comments
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;
  console.log(id);
  db.findPostComments(id).then(comments =>
    comments
      ? res.status(200).json(comments)
      : res
          .status(500)
          .json({ error: `The comment with the specified ID does not exist` })
          .catch(err =>
            res
              .status(500)
              .json({
                error: `The user information could not be retrieved ${err}`
              })
          )
  );
});
//update post
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (!id)
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  if (!title || !contents)
    res
      .status(400)
      .json({
        errorMessage: "Please provide title and contents for the post."
      });
  const updatedPost = { title, contents };
  db.update(id, updatedPost)
    .then(response =>
      response
        ? res.status(200).json(response)
        : res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
    )
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be modified." })
    );
});
//delete post by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(post =>
      post
        ? res.status(200).json(post)
        : res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
    )
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed" })
    );
});
// router.delete(`/:id/`, (req, res) => {
//   const id = req.params;
//   db
//     .remove(id)
//     .then(post =>
//       post
//         ? res.status(200).json(post)
//         : res.status(500).json({error: `the User with the specified ID does not exist`})
//     )
//       .catch(err => res.status(500)
//       .json({error: `The user information could not be retrieved ${err}`}))
// }

// router.get('/:id/comments', (req, res) => {
//   const { id } = req.params;
//   db
//    .findById(id)
//    .then(post => {
//     if (post.length > 0) {
//      db
//       .findPostComments(id)
//       .then(comment => {
//        res.status(200).json(comment);
//       })
//       .catch(err => {
//        res
//         .status(500)
//         .json({ error: 'The comments information could not be retrieved.' });
//       });
//     } else {
//      res
//       .status(404)
//       .json({ message: 'The post with the specified ID does not exist' });
//     }
//    })
//    .catch(err => {
//     res
//      .status(500)
//      .json({ error: 'The comments information could not be retrieved.' });
//    });
//   });

// router.get('/:id', (req, res) => {
//   res.status(200).send('hello from the GET /posts/:id endpoint');
// });

// router.post('/', (req, res) => {
//   res.status(200).send('hello from the POST /posts endpoint');
// });

module.exports = router;
