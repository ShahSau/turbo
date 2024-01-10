import prisma from '@/app/libs/prismadb';

// interface IParams {
//   userId: string;
// }

export default async function getUserById(
  userId: string,
) {
  try {

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
