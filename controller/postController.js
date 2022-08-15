const postingModel = require("../models/postingModel");
const { addPostAuth } = require("../authentication/postAuth");
const { uploadPostImage } = require("../helper/postImage");
const fs = require("fs");

// add post
const addPost = async (req, res, next) => {
  try {
    let { postImage, description, userName, date } = req.body;
    // postImage = "";
    await addPostAuth(description, userName, date);
    if (req.files) {
      let image = req.files.photo;

      const path = await uploadPostImage(image);
      postImage = path;
    }
    const post = await postingModel.create({
      postImage,
      description,
      userName,
      date,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
    // console.log(error);
  }
};

// get post by ID

const getPostById = async (req, res) => {
  const { id } = req.params;

  const singlePost = await postingModel.findById(id);
  if (!singlePost) {
    return res.status(404).json({ error: "no post found" });
  }
  return res.status(200).json(singlePost);
};

//get all posts
const getAllPost = async (req, res) => {
  const allPost = await postingModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(allPost);
};

//update post
const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const postCheck = await postingModel.findById(id);
    let image = req.files ? req.files.photo : postCheck.postImage;
    if (!postCheck) {
      return res.status(400).json({ error: "no such post found" });
    }
    const change = {
      discription: req.body.description,
      userName: req.body.userName,
      data: req.body.data,
      postImage: postCheck.postImage,
    };
    if (req.files) {
      if (postCheck.postImage) {
        fs.unlink(
          `${process.env.POST_IMAGE_PATH}/${postCheck.postImage}`,
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      }
      const path = await uploadPostImage(image);
      change.postImage = path;
    }
    const post = await postingModel.findByIdAndUpdate(id, change, {
      new: true,
    });

    return res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

// post delete....
const postDelete = async (req, res) => {
  const { id } = req.params;

  const post = await postingModel.findOneAndDelete({ _id: id });
  if (!post) {
    return res.status(404).json({ error: "no such post found" });
  }
  if (req.files) {
    fs.unlink(`${process.env.POST_IMAGE_PATH}/${post.postImage}`, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  return res.status(200).json("post deleted");
};
module.exports = {
  addPost,
  getPostById,
  getAllPost,
  updatePost,
  postDelete,
};
