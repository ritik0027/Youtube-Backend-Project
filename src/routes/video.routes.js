import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { deleteVideo, getAllVideos, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/video.controller.js";


const router=Router()

router.route("/publish-video").post(verifyJWT,
    upload.fields([
        {
            name:"videoFile",
            maxCount:1
        },
        {
            name:"thumbnail",
            maxCount:1
        }
    ]),
    publishAVideo
)


router.route("/get-all-videos").get(getAllVideos)
router.route("/:videoId").get(verifyJWT,getVideoById)
router.route("/update-video/:videoId").post(verifyJWT,upload.single("thumbnail"), updateVideo)
router.route("/delete-video/:videoId").delete(verifyJWT,deleteVideo)
router.route("/toggle-publish-status/:videoId").post(verifyJWT,togglePublishStatus)



export default router