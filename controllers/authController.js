import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import sendEmail from '../utils/mail-service.js';

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    username,
    bYear,
    bMonth,
    bDay,
    gender,
  } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    username,
    bYear,
    bMonth,
    bDay,
    gender,
  });

  const token = await user.createJWT();

  const url = `${process.env.BASE_URL}/activate/${token}`;

  sendEmail(email, firstName, url);

  res.status(StatusCodes.CREATED).json({
    // eslint-disable-next-line
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    picture: user.picture,
    verified: user.verified,
    message: '註冊成功，驗證信件已經發送到你的Email',
    token,
  });
};

export const login = (req, res) => {
  console.log(req, res);
};
