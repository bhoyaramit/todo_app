import { app } from "./app.js";
import {ConnectDB} from "./data/db.js";
ConnectDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server is working on Port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
});
