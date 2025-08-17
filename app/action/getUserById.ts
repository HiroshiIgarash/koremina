import prisma from "@/lib/db";

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      mostFavoriteLiver: true,
      favoriteLivers: true,
    },
  });

  return user;
};

export default getUserById;
