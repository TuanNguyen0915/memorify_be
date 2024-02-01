import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    name: { type: String },
    desc: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
export default Post
