import Roadmap from "../models/Roadmap.js";

export const getRoadMap=async(req,res,next)=>{
    const {time,domain}=req.body
    try{
        const user=await Roadmap.findOne({timeRemaining:time,domain:domain});
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}
export const addRoadMap=async(req,res,next)=>{
    try{
        const user=await Roadmap.create(req.body);
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}