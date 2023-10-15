import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { user } from "./user";
const prisma = new PrismaClient();

async function main() {
  for (let users of user) {
    const hashedPassword = await hash(users.password, 10);
    console.log(`🚀 ~ hashedPassword:`, hashedPassword);
    users.password = hashedPassword;
    console.log(`🚀 ~ users:`, users);
    await prisma.user.create({ data: users });
    console.log(`🚀 ~ user:`, user);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    ~console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
