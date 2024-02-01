import mongoose, { Schema } from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String },
    desc: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    image: { type: String, required : true },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
export default Post
