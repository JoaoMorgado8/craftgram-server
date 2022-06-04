const router = require("express").Router();
/* const User = require("../models/User.model"); */
const Project = require("../models/Project.model");
const Comment = require("../models/Comment.model");

router.post("/projects/:projectId/comments", (req, res, next) => {
  const { projectId } = req.params;
  const { content } = req.body;
  const { _id } = req.payload;

  Comment.create({ author: _id, content })
    .then((newComment) => {
      return Project.findByIdAndUpdate(
        projectId,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});


router.delete("/projects/:projectId/comments", (req, res, next) => {
  const { _id } = req.payload;
  const 
  const { projectId } = req.params;
})

module.exports = router;
