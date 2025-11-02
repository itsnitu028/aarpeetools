import express from "express"
import { register,Login,Logout,googleLogin } from "../controller/Auth.js";
const AuthRoutes= express.Router();

AuthRoutes.post('/register',register)
AuthRoutes.post('/login',Login)
AuthRoutes.post('/logout',Logout)
AuthRoutes.get('/google',googleLogin);


export default AuthRoutes;