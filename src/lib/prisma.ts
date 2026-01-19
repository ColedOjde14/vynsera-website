// src/lib/prisma.ts
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Required for Next.js Node runtime
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaNeon({ connectionString });

const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;