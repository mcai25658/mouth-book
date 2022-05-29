import User from '../models/User.js';
import { BadRequestError } from '../errors/index.js';

const noUserMiddleware = async (req, res, next) => {
  const { userID } = req.user;
  const user = await User.findById(userID);

  if (!user) {
    throw new BadRequestError('帳號不存在');
  }

  next();
};

export default noUserMiddleware;
