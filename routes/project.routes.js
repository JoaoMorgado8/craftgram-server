const router = require("express").Router();
const User = require("../models/User.model");
const Project = require("../models/Project.model");
const fileUploader = require("../config/cloudinary.config");

router.post("/upload", fileUploader.single("img"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ fileUrl: req.file.path });
});

router.post("/projects", (req, res, next) => {
  const { _id } = req.payload;
  const { name, img, category } = req.body;

  Project.create({ name, img, category, comments: [] })
    .then((createdProject) => {
      return User.findByIdAndUpdate(
        _id,
        { $push: { createdProjects: createdProject._id } },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/projects", (req, res, next) => {
  Project.find()
    .populate({
      path: "comments",
      populate: { path: "author" },
    })
    .then((allProjects) => {
      res.json(allProjects);
    })
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
  const { _id } = req.payload;
  const { projectId } = req.params;

  Project.findByIdAndRemove(projectId)
    .then(() => {
      return User.findByIdAndUpdate(
        _id,
        { $pull: { createdProjects: projectId } },
        { new: true }
      );
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = router;
