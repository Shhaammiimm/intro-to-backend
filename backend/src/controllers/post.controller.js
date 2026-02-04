import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
//create a post

const createPost = async (req, res ) => {
    try{
       const {name, description,age} = req.body;

       if(!name || !description || !age){
        return res.status(400).json({
            message: "All fields are required"
        })
       };
       
       const post = await Post.create({
         name, description, age
       });

       return res.status(201).json({
        message: "post created successfully!!",
        post
       });

    }
    catch(error){
       res.status(500).json({
        message: "Internal server error!"
       });
    }
}

const getPost = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts)
    }
    catch(error){
       res.status(500).json({
        message: "Internal server error!"
       });
    }
}

const updatePost = async (req, res) => {
    try{

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message : "no data found"
            })
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if(!post)return res.status(404).json({
            message: "post not found!!"
        })
        
        return res.status(201).json({
        message: "post updated successfully!!",
        post
       });

    }

    catch(error){
       res.status(500).json({
        message: "Internal server error!"
       });
    }

}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid post ID"
      });
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      post
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


export {
    createPost, getPost, updatePost, deletePost
}