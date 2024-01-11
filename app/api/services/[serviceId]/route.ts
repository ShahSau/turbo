import { NextResponse } from "next/server";

import getCurrentUser from "@/app/[lang]/actions/getCurrentUser";
import prisma from "@/app/[lang]/libs/prismadb";

interface IParams {
  serviceId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { serviceId } = params;

  if (!serviceId || typeof serviceId !== 'string') {
    throw new Error('Invalid ID');
  }

  const service = await prisma.service.deleteMany({
    where: {
      id: serviceId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(service);
}