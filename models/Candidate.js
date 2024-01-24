const mongoose = require("mongoose");
const { Schema } = mongoose;

const candidateSchema = new Schema(
  {
    name: { type: String, required: [true, "Please Enter Your Name"] },
    username: {
      type: String,
      required: [true, "Please Enter Your UserName"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
    },
    password: { type: Buffer, required: true },

    role: {
      type: String,
      required: [false, "Role Should Be Provided"],
      default: "user",
    },
    CandidateID: { type: String },
    Constituency: { type: String },
    Party: { type: String },
    PartySymbol: { type: String },
    VoteCount: { type: Number },
    addresses: { type: [Schema.Types.Mixed] },
    // TODO:  We can make a separate Schema for this

    profileimages: { type: String },
    salt: Buffer,
    resetPasswordToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// To store encrypted password use type:Buffer
const virtual = candidateSchema.virtual("id").get(function () {
  return this._id.toString;
});

candidateSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
