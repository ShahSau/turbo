import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
  userId?: string;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  passangersCount?: number;
  cylindersCount?: number;
  mileageCount?: number;
  model?: string;
  fuelType?: string;
  transmissionType?: string;
  driveType?: string;
  year?: number
}

export default async function getListings(
  params: IListingsParams,
) {
  try {
    const {
      userId,
      locationValue,
      startDate,
      endDate,
      category,
      passangersCount,
      cylindersCount,
      mileageCount,
      model,
      fuelType,
      transmissionType,
      driveType,
      year,
    } = params;
    console.log('params', params);

    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (cylindersCount) {
      query.cylindersCount = {
        gte: +cylindersCount,
      };
    }

    if (passangersCount) {
      query.passangersCount = {
        gte: +passangersCount,
      };
    }

    if (model) {
      query.model = model;
    }

    if (fuelType) {
      query.fuelType = fuelType;
    }

    if (transmissionType) {
      query.transmissionType = transmissionType;
    }

    if (driveType) {
      query.driveType = driveType;
    }

    if (year) {
      query.year = year;
    }

    if (mileageCount) {
      query.mileageCount = {
        gte: +mileageCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}


export interface IRepairParams {

  // fix the data structure before working on it
  // userId?: string;
  // startDate?: string;
  // endDate?: string;
  // locationValue?: string;
  // category?: string;
  // passangersCount?: number;
  // cylindersCount?: number;
  // mileageCount?: number;
  // model?: string;
  // fuelType?: string;
  // transmissionType?: string;
  // driveType?: string;
  // year?: number
}