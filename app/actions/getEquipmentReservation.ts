import prisma from '@/app/libs/prismadb';


interface IParams {
  serviceId?: string;
  userId?: string;
  authorId: string;
}

export default async function getEquipmentReservations(
  params: IParams,
) {
  try {
    let { serviceId, userId, authorId } = params;
    const query: any = {};

    
    if (serviceId) {
      query.equipmentId = serviceId;
    }

    // dont uncomment this
    // if (userId) {
    //   query.userId = userId;
    // }

    // in case of service reservations, userId is the authorId and service.uerserId is the creator of the service
    if (authorId) {
      query.userId = authorId;
    }

    const reservations = await prisma.equipmentReservation.findMany({
      where: query,
      include: {
        equipment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    const safeReservations = reservations.map(
      (reservation) => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        service: {
          ...reservation.equipment,
          createdAt: reservation.equipment.createdAt.toISOString(),
        },
      }),
    );

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
