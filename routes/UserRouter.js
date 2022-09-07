const Router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

Router.get('/', controller.getAllUser)
Router.get('/:user_id', controller.getOneUser)
Router.get(
  '/loggedin',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckLogin
)
Router.post('/login', controller.LoginUser)
Router.post('/register', controller.RegisterUser)
Router.put('/:user_id', controller.updateUserPassword)
Router.put('/email/:user_id', controller.updateUserEmail)
Router.put('/username/:user_id', controller.updateUserUsername)
Router.delete('/:user_id', controller.deleteUser)

module.exports = Router
