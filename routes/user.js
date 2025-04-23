import {Router} from 'express'
import { createUserTrack, deleteUserTrack, getAllUserTrack } from '../controller/user.js';
const router = Router();

router.post("/createUserTrack",createUserTrack);
router.get("/getAllUserTrack",getAllUserTrack);
router.delete("/deleteUserTrack",deleteUserTrack);

export default router;