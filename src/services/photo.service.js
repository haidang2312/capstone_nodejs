import prisma from "../common/prisma/init.prisma.js";
const photoService = {
  getPhotos: async () => {
    const photos = await prisma.photos.findMany({
      orderBy: { created_at: "desc" },
    });
    return photos;
  },
  searchPhoto: async (req) => {
    const { name } = req.body;
    const photos = await prisma.photos.findMany({
      where: {
        title: name
      },
      orderBy: { created_at: "desc" },
    });
    return photos;
  },
  getPhotoById: async (photoId) => {
    return await prisma.photos.findUnique({
      where: { id: Number(photoId) },
      include: { 
        users: { select: { id: true, username: true, email: true } },
        comments: true,    
        saved_photos: true, 
      },
    });
  },

  getCommentsByPhotoId: async (photoId) => {
    return await prisma.comments.findMany({
      where: { photo_id: Number(photoId) },
      include: { users: true }, 
      orderBy: { created_at: "desc" },
    });
  },

  checkIfPhotoSaved: async (userId, photoId) => {
    return await prisma.saved_photos.findFirst({
      where: { user_id: Number(userId), photo_id: Number(photoId) },
    });
  },

  addComment: async (userId, photoId, content) => {
    return await prisma.comments.create({
      data: {
        user_id: Number(userId),
        photo_id: Number(photoId),
        content,
      },
    });
  },
  getSavedPhotosByUserId: async (userId) => {
    return await prisma.saved_photos.findMany({
      where: { user_id: Number(userId) },
      include: { photos: true },
    });
  },

  getPhotosByUserId: async (userId) => {
    return await prisma.photos.findMany({
      where: { user_id: Number(userId) },
      orderBy: { created_at: "desc" },
    });
  },
  deletePhotoById: async (photoId) => {
    return await prisma.photos.delete({
      where: { id: Number(photoId) },
    });
  },
};

export default photoService;
