import { NextResponse } from "next/server";

import getCurrentUser from "@/app/[lang]/actions/getCurrentUser";
import prisma from "@/app/[lang]/libs/prismadb";

interface IParams {
  equipmentId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { equipmentId } = params;

  if (!equipmentId || typeof equipmentId !== 'string') {
    throw new Error('Invalid ID');
  }

  const service = await prisma.equipment.deleteMany({
    where: {
      id: equipmentId,
      userId: currentUser.id
    }
  });

  return NextResponse.json(service);
}