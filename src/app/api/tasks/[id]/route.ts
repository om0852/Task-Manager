import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log(id)
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const task = await prisma.task.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ error: "Delete Successfully", status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Something Went Wrong", error: error.message },
      { status: 400 }
    );
  }
}
