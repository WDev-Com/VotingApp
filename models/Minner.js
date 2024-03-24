const mongoose = require("mongoose");
const { Schema } = mongoose;

const MinnerSchema = new Schema(
  {
    name: { type: String, required: [false, "Please Enter Your Name"] },
    username: {
      type: String,
      required: [true, "Please Enter Your UserName"],
      unique: true,
    },
    email: {
      type: String,
      required: [false, "Please Enter Your Email"],
      unique: true,
    },
    password: { type: Buffer, required: true },
    role: {
      type: String,
      required: [false, "Role Should Be Provided"],
      default: "none",
    },
    region: { type: String },
    MinnerID: { type: String },
    profileimages: { type: String },
    salt: Buffer,
    resetPasswordToken: { type: String, default: "" },
  },
  { timestamps: true }
);

// To store encrypted password use type:Buffer
const virtual = MinnerSchema.virtual("id").get(function () {
  return this._id.toString;
});

MinnerSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Minner = mongoose.model("Minner", MinnerSchema);
module.exports = Minner;
