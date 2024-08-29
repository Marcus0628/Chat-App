const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(req, res) {
  try {
    const { password, userId } = req.body;

    const user = await UserModel.findById(userId);

    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(500).json({
        message: 'The password provided is not correct',
        error: true,
      });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    const cookiesOption = {
      http: true,
      secure: true,
    };

    return res
      .cookie('token', token, cookiesOption)
      .status(200)
      .json({
        message: `Login Successfully! Welcome ${user.name}`,
        token: token,
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = checkPassword;
