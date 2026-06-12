import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  // Préférer DIRECT_URL (connexion directe port 5432) pour le runtime :
  // le Transaction Pooler (port 6543) peut dropper les connexions inactives
  // et causer des échecs intermittents sur les opérations d'écriture.
  const connectionString =
    process.env.DIRECT_URL ?? process.env.DATABASE_URL;

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
