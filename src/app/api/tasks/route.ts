import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json("/signin");
    }
    const { title, description, date, completed, important } = await req.json();
    if (!title || !description || !date) {
      return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
    }
    if (title.length < 3) {
      return NextResponse.json(
        { message: "Title must be at least 3 characters long" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    return NextResponse.json("done");
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Something Went Wrong", error: error.message },
      { status: 400 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.redirect("/signin");
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json({ data: tasks });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Something Went Wrong", error: error.message },
      { status: 400 }
    );
  }
}
export async function PUT(req: NextRequest) {
  try {
    const { userId } = auth();
    const { isCompleted, id } = await req.json();
    if (!userId) {
      return NextResponse.redirect("/signin");
    }

    const  task =await prisma.task.update({
      where:{
        id
      },
      data:{
        isCompleted
      }
    })
    return NextResponse.json({message:"Task Updated"})
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Something Went Wrong", error: error.message },
      { status: 400 }
    );
  }
}
