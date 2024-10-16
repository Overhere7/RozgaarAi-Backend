import { addError } from "../error.js"
import Users from "../models/Users.js"

export const updateUser=async(req,res,next)=>{
    // if(req.params.id==req.user.id){
        try{
            const updatedUser=await Users.findByIdAndUpdate(req.user.id,{
                $set:req.body
            },
            {
                new:true
            }
            )
            return res.status(200).json(updatedUser)
        }
        catch(err){
            next(err)
        }
    // }
    // else{
    //     return next(addError(400,"You Cannot Update Other Account"))
    // }
}
export const deleteUser=async(req,res,next)=>{
    if(req.params.id==req.user.id){
        try{
            const users=await Users.findByIdAndDelete(req.params.id,
            )
            if(users){
                return res.status(200).json("User is Removed")
            }
            return res.status(200).json("User does not exist")
        }
        catch(err){
            next(err)
        }
    }
    else{
        return next(addError(400,"You Cannot Delete Other Account"))
    }
}
export const getUser=async(req,res,next)=>{
    try{
        const user=await Users.findById(req.params.id);
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}
export const getCurrentUser=async(req,res,next)=>{
    try{
        const user=await Users.findById(req.user.id);
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}
