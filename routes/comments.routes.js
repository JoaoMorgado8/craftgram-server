const router = require("express").Router();

const Project = require("../models/Project.model");
const Comment = require("../models/Comment.model");

router.post("/comments", (req, res, next) => {
  const { author, content } = req.body;

  Comment.create({ author, content, project })
    .then((newComment) => {
      return Project.findByIdAndUpdate(
        project,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
