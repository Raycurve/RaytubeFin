import express from 'express';
import {signin, signup, test} from '../controllers/auth.js';

const router = express.Router();

router.get("/test", test);  

//create a user
router.post("/signup", signup);

//sign in
router.post("/signin", signin);

//google oauth
router.post("/oauth", );


export default router;



