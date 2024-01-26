const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
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
    VoterID: { type: String },
    Constituency: { type: String },
    addresses: { type: [Schema.Types.Mixed] },
    // TODO:  We can make a separate Schema for this

    profileimages: { type: String },
    salt: Buffer,
    resetPasswordToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// To store encrypted password use type:Buffer
const virtual = userSchema.virtual("id").get(function () {
  return this._id.toString;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Voter = mongoose.model("Voter", userSchema);
module.exports = Voter;
