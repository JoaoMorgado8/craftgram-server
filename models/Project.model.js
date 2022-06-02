const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
});

const Project = model("Project", projectSchema);

module.exports = Project;
