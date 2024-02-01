import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Register new user
const register = async (req, res) => {
  let newUser = await User.findOne({ email: req.body.email })
  if (newUser) {
    return res.status(404).json({ success: false, message: 'This user is already exist' })
  }
  newUser = await User.create(req.body)
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
}

export { register }
