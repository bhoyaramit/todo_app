import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/auth.js";
import { newTask ,getMyTask, updateTask,deleteTask} from "../controllers/Task.js";


router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMyTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

export default router;