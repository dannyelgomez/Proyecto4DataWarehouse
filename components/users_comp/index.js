const usersRouter = require('express').Router()

const { createUser, getUserById, getUsers, updateUser, deleteUser, userIdParams, userExists } = require('./users');

usersRouter.post('/', createUser);
usersRouter.get('/:id', userIdParams, getUserById);
usersRouter.get('/', getUsers);
usersRouter.put('/:id', userIdParams, userExists, updateUser);
usersRouter.delete('/:id', userIdParams, userExists, deleteUser);

module.exports = usersRouter;