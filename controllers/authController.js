import User from '../models/User.js';

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

  res.json(user);
};

export const login = (req, res) => {
  console.log(req, res);
};
