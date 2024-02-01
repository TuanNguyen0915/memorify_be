import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

//**************** GENERATE T0KEN ****************/
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

//**************** REGISTER ****************/
const register = async (req, res) => {
  try {
    let newUser = await User.findOne({ email: req.body.email })
    if (newUser) {
      return res.status(404).json({ success: false, message: 'This user is already exist' })
    }
    newUser = await User.create(req.body)
    //create token
    const token = generateToken(newUser._id)
    const { password, ...rest } = newUser._doc
    return res
      .cookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2days
      })
      .status(201)
      .json({ success: true, message: 'Create a new user successfully', user: rest })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

//**************** LOGIN ****************/
const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    // check email
    if (!user) {
      return res.status(404).json({ success: false, message: 'This account is not exists' })
    }
    // check password
    const isPasswordMatching = bcrypt.compareSync(req.body.password, user.password)
    if (!isPasswordMatching) {
      return res.status(404).json({ success: false, message: 'This password is not matching' })
    }
    //create token
    const token = generateToken(user._id)
    const { password, ...rest } = user._doc
    return res
      .cookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 day
      })
      .status(200)
      .json({ success: true, message: 'Login successfully', token, user: rest })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

//**************** GET USER DETAILS ****************/
const getUser = async (req, res) => {
  try {
    // const id = req.params.userId
    let user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: 'This account is not exits.' })
    }
    const { password, ...rest } = user._doc
    return res.status(200).json({ success: true, message: `${user.firstName} ${user.lastName} info`, user: rest })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

//**************** UPDATE USER ****************/
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    let user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ success: false, message: 'This account is not exits.' })
    }

    // const { password, ...rest } = user._doc
    return res.status(200).json({ success: true, message: `${user.firstName} ${user.lastName} info`, user: user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

//**************** UPDATE USER ****************/

export { register, login, getUser, updateUser }
