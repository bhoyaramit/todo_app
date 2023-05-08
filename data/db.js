import mongoose from "mongoose";

export const ConnectDB =()=>{ 
mongoose.connect(process.env.MONGO_URI,{

     dbName:"todo_App_db",
     }).then(()=>{
      console.log("Database Connected");
  }).catch((error)=>{
       console.log(error);
 })
}

