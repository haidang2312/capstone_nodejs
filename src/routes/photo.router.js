import express from "express";
import photoController from "../controllers/photo.controller.js";



const photoRouter = express.Router();

photoRouter.get("/get-photos", photoController.getPhotos);
photoRouter.get("/search-photo", photoController.searchPhoto);
photoRouter.get("/:photoId", photoController.getPhotoById);
photoRouter.get("/:photoId/comments", photoController.getCommentsByPhotoId);
photoRouter.post("/check-save", photoController.checkIfPhotoSaved);
photoRouter.post("/comment", photoController.addComment);
photoRouter.get("/user/:userId/saved", photoController.getSavedPhotosByUserId);
photoRouter.get("/user/:userId/created", photoController.getPhotosByUserId);
photoRouter.delete("/:photoId", photoController.deletePhotoById);
export default photoRouter;
