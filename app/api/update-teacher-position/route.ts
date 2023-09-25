import { prisma } from "@/lib/primsa";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { teacherArray } = (await req.json()) as {
    teacherArray: User[];
  };

  try {
    // Start a Prisma transaction
    const transaction: User[] = await prisma.$transaction(
      teacherArray.map((user) => {
        return prisma.user.update({
          where: {
            id: user.id, // Assuming each user object has an 'id' field
            role: "Teacher",
          },
          data: {
            isAuthorize: "Authorize", // Set the isAuthorize field to 'Authorize'
          },
        });
      })
    );

    console.log(`🚀 ~ Users updated:`, transaction);
    revalidatePath("/request");

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
