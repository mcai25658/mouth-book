import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { BadRequestError } from '../errors/index.js';

// eslint-disable-next-line
export const activateAccount = async (req, res) => {
  const { userID } = req.user;
  const user = await User.findOne({ _id: userID });

  if (user.verified) {
    throw new BadRequestError('此帳號已經驗證過了');
  }

  await User.findByIdAndUpdate(userID, { verified: true });

  res.status(StatusCodes.OK).json({ message: '帳號驗證成功' });
};
