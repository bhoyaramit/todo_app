import express from "express";
const router = express.Router();
import { getmyProfile, register,login, logout } from "../controllers/User.js";
import { isAuthenticated } from "../middlewares/auth.js";


router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAuthenticated,getmyProfile);


export default router;