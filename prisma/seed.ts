import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import bcrypt from 'bcryptjs'
import "dotenv/config"

// 1. Clean the connection string to prevent conflicts
const rawConnectionString = process.env.DATABASE_URL || '';
const connectionString = rawConnectionString.split('?')[0]; 

// 2. Configure the pool with explicit SSL bypass
const pool = new pg.Pool({ 
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🚀 Starting seed process...')

  // Clean up: Remove the old default admin if it exists
  await prisma.user.deleteMany({
    where: { email: 'admin@athar.org' }
  })
  console.log('🗑️  Old default admin removed (if existed).')

  const hashedPassword = await bcrypt.hash('Admin123!@#', 10)
  
  // Upsert the new professional admin email
  const user = await prisma.user.upsert({
    where: { email: 'sy.athar01@gmail.com' },
    update: {
      role: 'SUPER_ADMIN'
    },
    create: {
      email: 'sy.athar01@gmail.com',
      name: 'Athar Admin',
      passwordHash: hashedPassword,
      role: 'SUPER_ADMIN'
    }
  })
  
  console.log(`✅ Admin account secured: ${user.email}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })