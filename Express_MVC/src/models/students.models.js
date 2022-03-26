const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    roll_id: { type: String, required: true },
    current_batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // evaluationID:{type:mongoose.Schema.Types.ObjectId,ref:"evaluation",required:true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
