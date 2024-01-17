import prisma from '@/app/[lang]/libs/prismadb';

interface IParams {
  serviceId?: string;
  userId?: string;
  authorId: string;
}

export default async function getServiceReservations(
  params: IParams,
) {
  try {
    const { serviceId, authorId } = params;
    const query: any = {};

    if (serviceId) {
      query.serviceId = serviceId;
    }

    // dont uncomment this
    // if (userId) {
    //   query.userId = userId;
    // }

    // in case of equipment reservations,
    // userId is the authorId and equipment.uerserId is the creator of the equipment
    if (authorId) {
      query.userId = authorId;
    }

    const reservations = await prisma.serviceReservation.findMany({
      where: query,
      include: {
        service: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeReservations = reservations.map(
      (reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        service: {
          ...reservation.service,
          createdAt: reservation.service.createdAt.toISOString(),
        },
      }),
    );

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
