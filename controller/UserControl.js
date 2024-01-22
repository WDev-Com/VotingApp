const Category = require("../models/Category");
const User = require("../models/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;
  // console.log(id);
  try {
    const user = await User.findById(id);
    res.status(200).json({
      id: user.id,
      name: user.name,
      addresses: user.addresses,
      email: user.email,
      profileimages: user.profileimages,
      role: user.role,
      bio: user.bio,
      occupation: user.occupation,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, name, profileimages, bio, occupation } = req.body; // Extract the fields you want to update
  try {
    const updatedFields = {};

    if (email) updatedFields.email = email;
    if (name) updatedFields.name = name;
    if (profileimages) updatedFields.profileimages = profileimages;
    if (bio) updatedFields.bio = bio;
    if (occupation) updatedFields.occupation = occupation;

    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
