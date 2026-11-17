import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import argon2 from "argon2";
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const hashPassword = await argon2.hash(
    process.env.ADMIN_PASSWORD || "123456",
  );

  await prisma.user.upsert({
    where: { gmail: "admin@gmail.com" },
    update: {},
    create: {
      gmail: "admin@gmail.com",
      username: "Aphisit",
      lastname: "Karmbud",
      password: hashPassword,
      role: "Admin",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
