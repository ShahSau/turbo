import prisma from '@/app/libs/prismadb';

export interface IServicesParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}


export default async function getServices(
    params: IServicesParams,
  ) {
    try {
      const {
        userId,
        locationValue,
        startDate,
        endDate,
        category,
      } = params;
  
      const query: any = {};
  
      if (userId) {
        query.userId = userId;
      }
  
      if (category) {
        query.category = category;
      }
  
      if (locationValue) {
        query.locationValue = locationValue;
      }
  

    if (startDate && endDate) {
        query.NOT = {
            serviceReservations: {
                some: {
                    startDate: { lte: startDate },
                    endDate: { gte: endDate },
                },
            },
        };
    }

  
      const services = await prisma.service.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      const safeServices = services.map((service) => ({
        ...service,
        createdAt: service.createdAt.toISOString(),
      }));
  
      return safeServices;
    } catch (error: any) {
      throw new Error(error);
    }
  }