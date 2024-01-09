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
    amount, 
    category,
    description,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const equipment = await prisma.equipment.create({
    data: {
      title,
      imageSrc,
      description,
      amount: parseInt(amount, 10),
      category,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(equipment);
}
