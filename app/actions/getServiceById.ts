import prisma from '@/app/libs/prismadb';

interface IParams {
  serviceId?: string;
}

export default async function getServiceById(
  params: IParams,
) {
  try {
    const { serviceId } = params;
    const listing = await prisma.service.findUnique({
      where: {
        id: serviceId,
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
