import prisma from "./../common/prisma/init.prisma.js";

const authService = {

  register: async (req) => {
    const { username, email, password } = req.body;
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("Email đã tồn tại.");
    }
    const newUser = await prisma.users.create({
      data: {
        username,
        email,
        password, 
      },
    });

    return newUser;
  },
  login: async (req) => {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error("Email không tồn tại.");
    }
    if (user.password !== password) {
      throw new Error("Mật khẩu không chính xác.");
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  },
};

export default authService;
