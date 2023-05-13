import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
import cors from "cors";

export const app = express();


config({
    path:"./data/config.env"
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
     origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
 })
);

app.use("/users",userRoute);
app.use("/task",taskRoute);

app.get("/",(req,res)=>{
    res.send("Hello");
});



app.use(errorMiddleware);
