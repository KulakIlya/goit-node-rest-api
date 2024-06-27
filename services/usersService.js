import User from './models/user.js';

const findUser = (filter) => User.findOne(filter);

const register = (userToRegister) => User.create(userToRegister);

const login = (email, token) =>
  User.findOneAndUpdate({ email }, { token }, { new: true });

const logout = (id) => User.findByIdAndUpdate(id, { token: '' });

const updateSubscription = (id, subscription) =>
  User.findByIdAndUpdate(id, { subscription }, { new: true });

export default { findUser, register, login, logout, updateSubscription };
