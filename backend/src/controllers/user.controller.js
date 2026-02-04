import {User} from "../models/user.model.js";

const registerUser = async (req, res) =>{
    try{
       
        const {username, email, password} = req.body;

        //basic validation

        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required!"});
        }

        //check if user already exists

        const existing = await User.findOne({email : email.toLowerCase()});
        if(existing){
            return res.status(400).json({message: "user already exists!!"});  
        }

        //create user

        const user = await User.create({
            username, email, password, loggedIn: false
        })

        res.status(201).json({
            message: "User registration successfull !!",
            user: {id: user._id, email: user.email, username: user.username}
        })

    }catch(error){
      res.status(500).json({message: "Internal server error", error: error.message});
    }
}

const loginUser = async (req, res) => {

    try{
         
        //checking exists user or not

        const {email, password} = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(404).json({
            message: "User not found"
        });

        //compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Password is incorrect"
        })

        res.status(200).json({
            message: "Login Successfull !",
            user:{
                id: user._id, email: user.email, username: user.username
            }

        })
    }
    catch(error){
       res.status(500).json({message: "Internal server error", error: error.message});
    }
}


//logout user

const logoutUser = async (req, res) => {

    try{
        const {email} = req.body;

        const isUser = await User.findOne({
            email: email.toLowerCase()
        });
        if(!isUser) return res.status(404).json({
          message: "User not found"
        });
      
        return res.status(200).json({
          message: "Successfully logout !!"
        })
    }
    catch(error){
      return res.status(500).json({
        message: "Internal server error",
        error: error.message
      })
    }
      

}

//
export{
    registerUser, loginUser, logoutUser
}