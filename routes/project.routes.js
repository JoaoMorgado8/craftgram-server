const router = require("express").Router();

const Project = require("../models/Project.model");

router.post("/projects", (req, res, next) => {
  const { name, img, category } = req.body;

  Project.create({ name, img, category, comments: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("comments")
    .then((allProjects) => res.json(allProjects))
    .catch((err) => res.json(err));
});

router.get("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  Project.findById(projectId)
    .populate("comments")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.delete("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  Project.findByIdAndRemove(projectId)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
