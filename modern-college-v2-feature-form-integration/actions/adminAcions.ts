// export const getTeacherRequestArray = async () => {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return { message: "user is not authorized", users: [] };
//   }

//   try {
//     const users = await prisma.user.findMany({
//       where: {
//         role: "Teacher",
//       },
//     });

//     return {
//       message: "Congrats request is initiated",
//       users,
//     };
//   } catch (error) {
//     return {
//       message: "Error occurred while deleting family item",
//       users: [],
//     };
//   }
// };
