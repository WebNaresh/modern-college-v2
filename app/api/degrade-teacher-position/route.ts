import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", users: [] };
  }
  const { teacherArray } = (await req.json()) as {
    teacherArray: User[];
  };

  try {
    // Start a Prisma transaction
    const updateOperations = teacherArray.map((user) => {
      return prisma.user.update({
        where: {
          id: user.id,
          role: "Teacher",
        },
        data: {
          isAuthorize: "UnAuthorize",
        },
      });
    });

    const deleteOperations = teacherArray.map((user) => {
      return prisma.user.deleteMany({
        where: { id: user.id, role: "Teacher" },
      });
    });

    const transaction = await prisma.$transaction([
      ...updateOperations,
      ...deleteOperations,
    ]);

    return new NextResponse(
      JSON.stringify({
        message: "Congrats request is initiated",
        users: transaction,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(`Error occurred while updating users: ${error}`);

    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "server error", // Corrected error message
      }),
      { status: 500 }
    );
  }
}
