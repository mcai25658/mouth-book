import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import sendEmail from '../utils/mail-service.js';
import { BadRequestError } from '../errors/index.js';

// @desc    create a new user & get token
// @route   POST   /api/v1/auth/register
// @access  Public
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
    message: '註冊成功，驗證信件已經發送到你的Email',
    user,
    token,
  });
};

// @desc    User login & get token
// @route   POST   /api/v1/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  const passwordIsMatch = await user?.matchPassword(password);

  if (!passwordIsMatch || !user) {
    throw new BadRequestError('帳號或是密碼錯誤');
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    message: '登入成功',
    user,
    token,
  });
};
