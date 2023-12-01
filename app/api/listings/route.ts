/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    imageSrc,
    category,
    location,
    price,
    passangersCount,
    cylindersCount,
    mileageCount,
    model,
    fuelType,
    transmissionType,
    maker,
    driveType,
    year,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      imageSrc,
      category,
      passangersCount,
      cylindersCount,
      mileageCount,
      model,
      fuelType: fuelType.value,
      transmissionType: transmissionType.value,
      maker,
      driveType: driveType.value,
      year: parseInt(year, 10),
      locationValue: location.label,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
