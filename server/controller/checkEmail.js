const UserModel = require('../models/UserModel');

async function checkEmail(req, res) {
  try {
    const { email } = req.body;

    const checkEmail = await UserModel.findOne({ email }).select('-password');

    if (!checkEmail) {
      return res.status(400).json({
        message: 'The email address provided does not exist',
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Your email address has been successfully verified',
      data: checkEmail,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkEmail;
