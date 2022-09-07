const { User, Ticket } = require('../models')
const middleware = require('../middleware')
const { Op } = require('sequelize')

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll()
    res.send(users)
  } catch (error) {
    throw error
  }
}

const getOneUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    const user = await User.findByPk(userId, { include: [{ model: Ticket }] })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.password, req.body.password))
    ) {
      let payload = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    } else {
      res.send({ status: 'Error', msg: 'Unauthorized' })
    }
  } catch (error) {
    throw error
  }
}

const RegisterUser = async (req, res) => {
  try {
    const { email, password, username } = req.body
    let userAlready = await User.findOne({
      where: { [Op.or]: [{ username: username }, { email: email }] },
      raw: true
    })
    if (userAlready) {
      res.send({ status: 'Error', msg: 'Unauthorized' })
    } else {
      let passwordDigest = await middleware.hashPassword(password)
      const user = await User.create({
        email,
        password: passwordDigest,
        username
      })
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

const CheckLogin = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const updateUserPassword = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let { oldPassword, newPassword } = req.body
    const user = await User.findByPk(userId)
    if (
      user &&
      (await middleware.comparePassword(user.dataValues.password, oldPassword))
    ) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      let newInfo = await User.update(
        { password: passwordDigest },
        {
          where: {
            id: userId
          },
          returning: true
        }
      )
      res.send(newInfo)
    } else {
      res.send({ message: 'Error! Unable to update user info.' })
    }
  } catch (error) {
    throw error
  }
}

const updateUserUsername = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let { password } = req.body
    let newUsername = req.body.username
    const user = await User.findByPk(userId)
    let usernameTaken = await User.findOne({ where: { username: newUsername } })
    if (
      !usernameTaken &&
      user &&
      (await middleware.comparePassword(user.dataValues.password, password))
    ) {
      let newInfo = await User.update(
        { username: newUsername },
        {
          where: {
            id: userId
          },
          returning: true
        }
      )
      res.send(newInfo)
    } else {
      res.send({
        message: 'Error! Unable to update username! Invalid, or already taken.'
      })
    }
  } catch (error) {
    throw error
  }
}

const updateUserEmail = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let { password } = req.body
    let newEmail = req.body.email
    const user = await User.findByPk(userId)
    let emailTaken = await User.findOne({ where: { email: newEmail } })
    if (
      !emailTaken &&
      user &&
      (await middleware.comparePassword(user.dataValues.password, password))
    ) {
      let newInfo = await User.update(
        { email: newEmail },
        {
          where: {
            id: userId
          },
          returning: true
        }
      )
      res.send(newInfo)
    } else {
      res.send({ message: 'Error! Unable to update  email address!' })
    }
  } catch (error) {
    throw error
  }
}
const deleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let { password } = req.body
    const user = await User.findByPk(userId)
    if (
      user &&
      (await middleware.comparePassword(user.dataValues.password, password))
    ) {
      await User.destroy({
        where: {
          id: userId
        }
      })
      res.send({ message: 'Account has been deleted!' })
    } else {
      res.send({ message: 'Unable to delete account!' })
    }
  } catch (error) {
    throw error
  }
}
module.exports = {
  getAllUser,
  getOneUser,
  LoginUser,
  RegisterUser,
  CheckLogin,
  updateUserPassword,
  updateUserUsername,
  updateUserEmail,
  deleteUser
}
