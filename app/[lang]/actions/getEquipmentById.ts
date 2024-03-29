import prisma from '@/app/[lang]/libs/prismadb';

interface IParams {
  equipmentId?: string;
  lang?: string;
}

export default async function getEquipmentById(
  params: IParams,
) {
  try {
    const { equipmentId } = params;
    const listing = await prisma.equipment.findUnique({
      where: {
        id: equipmentId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toString(),
        updatedAt: listing.user.updatedAt.toString(),
        emailVerified:
          listing.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
