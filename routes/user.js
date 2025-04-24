import {Router} from 'express'
import { createUserTrack, deleteAll, deleteUserTrack, getAllUserTrack } from '../controller/user.js';
const router = Router();

router.post("/createUserTrack",createUserTrack);
router.get("/getAllUserTrack",getAllUserTrack);
router.delete("/deleteUserTrack/:id",deleteUserTrack);
router.post("/deleteAllUser",deleteAll)

export default router;