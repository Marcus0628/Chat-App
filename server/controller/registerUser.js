const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');

async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;

    const checkEmail = await UserModel.findOne({ email });
    // if has this email will return {name , email}, or dont has this email will return null

    if (checkEmail) {
      return res.status(400).json({
        message: 'The email address provided is already in use',
        error: true,
      });
    }

    //password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };

    const user = new UserModel(payload);
    // Creates a new instance of the UserModel using the payload data.

    const userSave = await user.save();
    // Saves the user document to the database.

    return res.status(201).json({
      message: 'User created Successfully',
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
