import prisma from '@/app/libs/prismadb';

export interface IEquipmentParams {
  userId?: string;
  category?: string;
}


export default async function getEquipments(
    params: IEquipmentParams,
  ) {
    try {
      const {
        userId,
        category,
      } = params;
  
      const query: any = {};
  
      if (userId) {
        query.userId = userId;
      }
  
      if (category) {
        query.category = category;
      }
  
  


  
      const equipments = await prisma.equipment.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      const safeEquipments = equipments.map((equipment) => ({
        ...equipment,
        createdAt: equipment.createdAt.toISOString(),
      }));
  
      return safeEquipments;
    } catch (error: any) {
      throw new Error(error);
    }
  }