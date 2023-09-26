import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/primsa";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export const getTeacherRequestArray = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", users: [] };
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        isAuthorize: "Request",
        role: "Teacher",
      },
    });

    return {
      message: "Congrats request is initiated",
      users,
    };
  } catch (error) {
    return {
      message: "Error occurred while deleting family item",
      users: [],
    };
  }
};
export const updateTeachersPosition = async (teacherArray: User[]) => {
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

    return {
      message: "Congrats request is initiated",
      users: transaction,
    };
  } catch (error) {
    return {
      message: "Error occurred while updating users",
      users: null,
    };
  }
};
