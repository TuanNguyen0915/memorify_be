import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // username: { type: String, unique: true },
    isAdmin: { type: Boolean, default: false },
    profilePhoto: { type: String },
    about: { type: String },
    live: { type: String },
    work: { type: String },
    relationship: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

//hashing password
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, 10)
  return next()
})

const User = mongoose.model('User', userSchema)
export default User
