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
    description,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  const listing = await prisma.service.create({
    data: {
      title,
      imageSrc,
      description,
      locationValue: location.label,
      category,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
