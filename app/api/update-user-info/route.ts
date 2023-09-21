import { prisma } from "@/lib/primsa";
import { Session } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, imageUrl, data } = (await req.json()) as {
    name: string;
    imageUrl: string;
    data: Session;
  };
  const existingUser = await prisma.user.findUnique({
    where: {
      id: data.user?.id,
    },
  });

  if (existingUser) {
    // User with this email already exists, return an error response
    await prisma.user.update({
      where: {
        id: data.user?.id,
      },
      data: {
        name: name,
        image: imageUrl,
      },
    });
    return new NextResponse(
      JSON.stringify({
        status: "ok",
        message: "user update", // Corrected error message
      }),
      { status: 201 }
    );
  }

  return new NextResponse(
    JSON.stringify({
      status: "error",
      message: "server error", // Corrected error message
    }),
    { status: 500 }
  );
}
