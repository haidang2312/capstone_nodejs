import photoService from "../services/photo.service.js";

const photoController = {
  getPhotos: async (req, res) => {
    try {
      const photos = await photoService.getPhotos();
      res.status(200).json({
        status: "success",
        data: photos,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  searchPhoto: async (req, res) => {
    try {
      const photos = await photoService.searchPhoto(req);
      if (photos.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Không tìm thấy ảnh nào.",
        });
      }
      res.status(200).json({
        status: "success",
        data: photos,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  getPhotoById: async (req, res) => {
    try {
      const { photoId } = req.params;
      const photo = await photoService.getPhotoById(photoId);

      if (!photo) {
        return res
          .status(404)
          .json({ status: "error", message: "Không tìm thấy ảnh." });
      }

      res.status(200).json({ status: "success", data: photo });
    } catch (error) {
      res
        .status(500)
        .json({ status: "error", message: error.message || "Lỗi máy chủ." });
    }
  },

  getCommentsByPhotoId: async (req, res) => {
    try {
      const { photoId } = req.params;
      const comments = await photoService.getCommentsByPhotoId(photoId);
      res.status(200).json({ status: "success", data: comments });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  checkIfPhotoSaved: async (req, res) => {
    try {
      const { userId, photoId } = req.body;
      const savedPhoto = await photoService.checkIfPhotoSaved(userId, photoId);
      res.status(200).json({ status: "success", saved: !!savedPhoto });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  addComment: async (req, res) => {
    try {
      const { userId, photoId, content } = req.body;
      const newComment = await photoService.addComment(
        userId,
        photoId,
        content
      );
      res.status(201).json({ status: "success", data: newComment });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  getSavedPhotosByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const savedPhotos = await photoService.getSavedPhotosByUserId(userId);
      res.status(200).json({ status: "success", data: savedPhotos });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  getPhotosByUserId: async (req, res) => {
    try {
      const { userId } = req.params;
      const photos = await photoService.getPhotosByUserId(userId);
      res.status(200).json({ status: "success", data: photos });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },

  deletePhotoById: async (req, res) => {
    try {
      const { photoId } = req.params;
      await photoService.deletePhotoById(photoId);
      res
        .status(200)
        .json({ status: "success", message: "Ảnh đã được xóa thành công." });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  },
};

export default photoController;
