const usersRouter = require('express').Router()

const { createUser, getUserById, updateUser, deleteUser } = require('./users');

usersRouter.post('/createUser', createUser);
usersRouter.get('/', getUserById);
usersRouter.put('/updateUser', updateUser);
usersRouter.delete('/deleteUser', deleteUser);

module.exports = usersRouter;