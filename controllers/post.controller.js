import Post from '../models/post.model.js'

const createPost = async (req, res) => {
  try {
    let post = await Post.create(req.body)
    return res.status(201).json({ success: true, message: 'Created post successfully', post })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const postDetails = async (req, res) => {
  try {
    let post = await Post.findById(req.params.postId).populate('author', '-password')
    return res.status(200).json({ success: true, message: 'post details', post })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export { createPost, postDetails }
