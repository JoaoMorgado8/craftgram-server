const router = require("express").Router();
/* const fileUploader = require("../config/cloudinary.config"); */
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/user", (req, res, next) => {
  const { _id } = req.payload;
  console.log(req.payload);
  User.findById(_id)
    .populate("createdProjects")
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json({ message: "User not found!!" }));
});

/* router.put(
  "/user",
  fileUploader.single("userImage"),
  (req, res, next) => {
    const { _id } = req.payload
    if (req.file) {
      User.findByIdAndUpdate(
        userId,
        {
          username,
          imageUrl: req.file.path,
        },
        { new: true }
      )
        .then((response) => res.json(response))
        .catch((err) => res.status(400).json({ message: "No user updated" }));
    } else {
      User.findByIdAndUpdate(
        userId,
        {
          username,
          img,
        },
        { new: true }
      )

        .then((response) => res.json(response))
        .catch((err) => res.status(400).json({ message: "No user updated" }));
    }
  }
); */

module.exports = router;
