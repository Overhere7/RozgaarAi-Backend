import mongoose from "mongoose";

const NaukriJobsSchema=new mongoose.Schema({
        title: {
            type:String,
        },
        link:{
            type:String,
        },
        company:{
            type:String,
        },
        location:{
            type:String,
        },
        experience:{
            type:String,
        },
        salary:{
            type:String,
        },
        date_updated:{
            type:String,
        },
        company_image:{
            type:String,
        },
      },{timestamps:true})

export default mongoose.model("Naukri_jobs",NaukriJobsSchema)