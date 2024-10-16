import mongoose from "mongoose";

const RoadmapSchema=new mongoose.Schema({
    timeRemaining:{
        type:String,
        // required:true,
    },
    roadMap:{
        type:String,
        // required:true,
    },
    domain:{
        type:String,
        // required:true,
    },
    
},{timestamps:true})

export default mongoose.model("RoadmapSchema",RoadmapSchema)