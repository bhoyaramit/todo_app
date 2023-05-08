import Task from "../models/task.js";
import {sendToken} from "../utils/features.js"
import ErrorHandler, { errorMiddleware } from "../middlewares/error.js";


export const newTask = async(req,res)=>{
 try {
    const {title,description}= req.body;
    const tasks = await Task.create({
        title:title,
        description:description,
        user:req.user,
    });
res.status(200).json({
    success:true,
    message:"Task Created Successfully",
    tasks
});
 } catch (error) {
    next(error);
  }   
}

export const getMyTask = async(req,res)=>{
try {

    const userid= req.user._id;
    const task = await Task.find({user:userid});
    res.status(200).json({
        success:true,
        task
    });    
} catch (error) {
    next(error);
 }
}

export const updateTask = async(req,res,next)=>{
    try {

        const {id} = req.params;
        const task =await Task.findById(id);

        if(!task) return next(new ErrorHandler("Invalid Task",404));
    
        task.isCompleted = !task.isCompleted;
       await task.save();
       res.status(200).json({
           success:true,
           message:"task Updated",
           task
    }); 
    } catch (error) {
         next(error);
        
    }
}
export const deleteTask = async(req,res,next)=>{
    try {
     const task = await Task.findById(req.params.id);
     console.log(task);
    if(!task) return next(new ErrorHandler("Invalid Task",404));

    await task.deleteOne();
    res.status(200)
    .json({
        success:true,
        message:"task Deleted",
    }); 

    } catch (error) {
        next(error)        
  }   
}