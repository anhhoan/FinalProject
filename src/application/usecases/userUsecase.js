import userService from '../services/userService';

const getUsers = async (params) => {
  return await userService.getUsers(params);
};

const createUser = async (user) => {
  return await userService.createUser(user);
};

const updateUser = async (user) => {
  return await userService.updateUser(user);
};

const deleteUser = async (id) => {
  return await userService.deleteUser(id);
};

const userUseCase = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};

export default userUseCase;
