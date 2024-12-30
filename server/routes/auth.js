import express from 'express';
import {logout, signin, signup, test} from '../controllers/auth.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get("/test", test);  

router.post("/logout",verifyToken, logout);

//create a user
router.post("/signup", signup);

//sign in
router.post("/signin", signin);

//google oauth
router.post("/oauth", );


export default router;



