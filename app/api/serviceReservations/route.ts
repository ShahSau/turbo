/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';
console.log("serviceReservations/route.ts");
export async function POST(
  request: Request,
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    serviceId,
    startDate,
    endDate,
    totalPrice,
  } = body;

  if (!serviceId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const serviceAndReservation = await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: {
        serviceReservation: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(serviceAndReservation);
}
