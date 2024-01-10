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
    equipmentId,
    amount,
    totalPrice,
  } = body;

  if (!equipmentId || !amount || !totalPrice) {
    return NextResponse.error();
  }
  const serviceAndReservation = await prisma.equipment.update({
    where: {
      id: equipmentId,
    },
    data: {
        equipmentReservation: {
        create: {
          userId: currentUser.id,
          amount,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(serviceAndReservation);
}
