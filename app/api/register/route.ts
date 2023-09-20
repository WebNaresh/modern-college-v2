import { prisma } from "@/lib/primsa";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password, role } = (await req.json()) as {
    name: string;
    email: string;
    password: string;
    role: "Student" | "Teacher";
  };
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  if (existingUser) {
    // User with this email already exists, return an error response
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: "Email already in use",
      }),
      { status: 400 }
    );
  }
  try {
    const hashed_password = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        role: role,
      },
    });

    console.log(`🚀 ~ user:`, user);

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.log(`🚀 ~ error:`, error);
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message, // Corrected error message
      }),
      { status: 500 }
    );
  }
}
