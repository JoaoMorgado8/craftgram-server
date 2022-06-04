const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userImage: {
    type: String,
    default: "https://art.pixilart.com/3bec6617ebd4abe.png",
  },
  createdProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

const User = model("User", userSchema);

module.exports = User;
