import express from 'express';
import {deleteUser, dislike, getUser, like, subs, test, unsubs, update} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get("/test", test);

//update user
router.put("/:id",verifyToken, update);

//delete user
router.delete("/:id",verifyToken,deleteUser);

//get user
router.get("/find/:id",getUser);

//subs a user
router.put("/sub/:id",verifyToken,subs);

//unsub a user
router.put("/unsub/:id",verifyToken,unsubs);

//like a vid
router.put("/like/:videoId",verifyToken,like);

// disl a vid
router.put("/dislike/:videoId",verifyToken,dislike);






export default router;



