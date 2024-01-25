const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoteConfirmNoSchema = new Schema(
  {
    VoterID: { type: String },
    VoterConfirmNo: { type: Number },
  },
  { timestamps: true }
);

// To store encrypted password use type:Buffer
const virtual = VoteConfirmNoSchema.virtual("id").get(function () {
  return this._id.toString;
});

VoteConfirmNoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

VoteConfirmNo = mongoose.model("VoteConfirmNo", VoteConfirmNoSchema);
module.exports = VoteConfirmNo;
