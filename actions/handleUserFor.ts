"use server";

import { authOptions } from "@/lib/auth";
import { FamilyDetail, PersonalInfo, PreviousAcademic } from "@/lib/interface";
import { prisma } from "@/lib/primsa";
import { getServerSession } from "next-auth";

type Data = {
  name: string;
  imageUrl: string;
  religion: string;
  caste: string;
  permanentAddress: string;
  temporaryAddress: string;
  gender: "Male" | "Female" | "Other";
};
export const updateUserInfo = async ({
  name,
  imageUrl,
  religion,
  caste,
  permanentAddress,
  temporaryAddress,
  gender,
}: Data) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  } else {
    const user = await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        name,
        image: imageUrl,
        religion,
        caste,
        permanentAddress,
        temporaryAddress,
        gender,
      },
      select: {
        name: true,
        image: true,
      },
    });
    return {
      message: "user updated",
      user: user,
    };
  }
};
export const updateUserDetails = async (formData: PersonalInfo) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  }

  try {
    const existingPersonalInfo = await prisma.personalInfo.findFirst({
      where: {
        userId: session.user?.id!,
      },
    });

    if (existingPersonalInfo) {
      console.log(`🚀 ~ formData:`, formData);
      // If the record already exists, update it
      const updatedPersonalInfo = await prisma.personalInfo.update({
        where: {
          id: existingPersonalInfo.id,
        },
        data: {
          dateOfBirth: formData.dateOfBirth!,
          bloodGroup: formData.bloodGroup,
          mobile1: formData.mobile1,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          subjectOfTeaching: formData.subjectOfTeaching,
          employmentStatus: formData.employmentStatus,
        },
      });

      return {
        message: "user details updated",
        user: updatedPersonalInfo,
      };
    } else {
      // If the record doesn't exist, create it
      const newPersonalInfo = await prisma.personalInfo.create({
        data: {
          dateOfBirth: formData.dateOfBirth!,
          bloodGroup: formData.bloodGroup,
          mobile1: formData.mobile1,
          userId: session.user?.id as string,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          subjectOfTeaching: formData.subjectOfTeaching,
          employmentStatus: formData.employmentStatus,
        },
      });

      return {
        message: "user details created",
        user: newPersonalInfo,
      };
    }
  } catch (error) {
    console.error("Error updating/creating user details:", error);
    return {
      message: "error occurred",
      user: null,
    };
  }
};
export const updateFamilyDetails = async (array: FamilyDetail[]) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  }

  try {
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id!,
      },
      include: {
        familyDetail: true,
      },
    });

    // Map the array of family details to create or update them
    const familyDetailUpdates = array.map((element) => {
      // Check if the element exists in the user's familyDetail
      const existingElement = user?.familyDetail.find(
        (item) => item.id === element.id
      );

      // If it exists, update it; otherwise, create a new one
      if (existingElement) {
        return prisma.familyDetail.update({
          where: {
            id: existingElement.id,
          },
          data: {
            // Update fields as needed
            name: element.name,
            relationName: element.relationName,
            occupation: element.occupation,
            address: element.address,
            contact: element.contact,
          },
        });
      } else {
        return prisma.familyDetail.create({
          data: {
            // Set fields for a new family detail
            name: element.name,
            relationName: element.relationName,
            occupation: element.occupation,
            address: element.address,
            contact: element.contact,
            user: {
              connect: {
                id: session.user?.id!,
              },
            },
          },
        });
      }
    });

    // Use Prisma's transaction to perform updates in a single batch
    await prisma.$transaction(familyDetailUpdates);

    // Optionally, you can return a success message or updated user data
    return {
      message: "Family details updated",
      user: user, // You can include the updated user data here
    };
  } catch (error) {
    console.error("Error updating/creating family details:", error);
    return {
      message: "An error occurred",
      user: null,
    };
  }
};

export const deleteFamilyItem = async (element: FamilyDetail) => {
  console.log(`🚀 ~ element:`, element);
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  }

  try {
    const existingPersonalInfo = await prisma.user.findFirst({
      where: {
        id: session.user?.id!,
      },
      include: {
        familyDetail: true,
      },
    });

    if (existingPersonalInfo) {
      // Filter out the element with the specified ID
      const updatedFamilyDetail = existingPersonalInfo.familyDetail.filter(
        (e) => e.id !== element.id
      );

      // Delete the element from the FamilyDetail table
      await prisma.familyDetail.delete({
        where: {
          id: element.id,
        },
      });

      // Update the user's familyDetail field
      await prisma.user.update({
        where: {
          id: session.user?.id!,
        },
        data: {
          familyDetail: {
            set: updatedFamilyDetail, // Set the updated array
          },
        },
      });
    }

    return {
      message: "Family item deleted",
      user: session,
    };
  } catch (error) {
    console.error("Error deleting family item:", error);
    return {
      message: "Error occurred while deleting family item",
      user: null,
    };
  }
};
export const updatePreviousAcademics = async (array: PreviousAcademic[]) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  }

  try {
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id!,
      },
      include: {
        previousAcademics: true,
      },
    });
    console.log(`🚀 ~ user:`, user);

    // Map the array of previous academics to create or update them
    // const previousAcademicsUpdates =
    array.map(async (element) => {
      // Check if the element exists in the user's previous academics
      const existingElement = user?.previousAcademics.find(
        (item) => item.id === element.id
      );
      console.log(`🚀 ~ existingElement:`, existingElement);

      // If it exists, update it; otherwise, create a new one
      if (existingElement) {
        const exist = await prisma.previousAcademic.update({
          where: {
            id: existingElement.id,
          },
          data: {
            // Update fields as needed
            boardUniversity: element.boardUniversity,
            collegeName: element.collegeName,
            courseName: element.courseName,
            passingYear: element.passingYear,
            percentage: element.percentage,
          },
        });
        console.log(`🚀 ~ exist:`, exist);
      } else {
        const exist = await prisma.previousAcademic.create({
          data: {
            // Set fields for a new previous academic
            boardUniversity: element.boardUniversity,
            collegeName: element.collegeName,
            courseName: element.courseName,
            passingYear: element.passingYear,
            percentage: element.percentage,
            user: {
              connect: {
                id: session.user?.id,
              },
            },
          },
        });
        console.log(`🚀 ~ exist2:`, exist);
      }
    });

    // Use Prisma's transaction to perform updates in a single batch
    // await prisma.$transaction(previousAcademicsUpdates);

    // Optionally, you can return a success message or updated user data
    return {
      message: "Previous academics details updated",
      user: user, // You can include the updated user data here
    };
  } catch (error) {
    console.error("Error updating/creating previous academics details:", error);
    return {
      message: "An error occurred",
      user: null,
    };
  }
};

export const deleteAcademicsItem = async (element: PreviousAcademic) => {
  console.log(`🚀 ~ element:`, element);
  const session = await getServerSession(authOptions);
  if (!session) {
    return { message: "user is not authorized", user: null };
  }

  try {
    const existingPersonalInfo = await prisma.user.findFirst({
      where: {
        id: session.user?.id!,
      },
      include: {
        previousAcademics: true,
      },
    });

    if (existingPersonalInfo) {
      // Filter out the element with the specified ID
      const updateAcademics = existingPersonalInfo.previousAcademics.filter(
        (e) => e.id !== element.id
      );

      // Delete the element from the PreviouseAcademicDetail table
      await prisma.previousAcademic.delete({
        where: {
          id: element.id,
        },
      });

      // Update the user's familyDetail field
      await prisma.user.update({
        where: {
          id: session.user?.id!,
        },
        data: {
          previousAcademics: {
            set: updateAcademics, // Set the updated array
          },
        },
      });
    }

    return {
      message: "PreviouseAcademic item deleted",
      user: session,
    };
  } catch (error) {
    console.error("Error deleting family item:", error);
    return {
      message: "Error occurred while deleting family item",
      user: null,
    };
  }
};
