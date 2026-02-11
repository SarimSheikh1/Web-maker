#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('🚀 Setting up SiteCraft database...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...')
  const envExample = fs.readFileSync(path.join(process.cwd(), '.env.example'), 'utf8')
  fs.writeFileSync(envPath, envExample)
  console.log('✅ Created .env.local - please update with your database URL\n')
}

try {
  console.log('🔧 Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit' })
  
  console.log('\n📊 Setting up database schema...')
  execSync('npx prisma db push', { stdio: 'inherit' })
  
  console.log('\n🌱 Seeding database with demo data...')
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit' })
  
  console.log('\n✅ Database setup complete!')
  console.log('\n🎉 You can now run: npm run dev')
  console.log('\n🔑 Demo credentials:')
  console.log('   Email: demo@sitecraft.com')
  console.log('   Password: demo123')
  console.log('\n🌐 Demo site: http://localhost:3001/site/demo-agency')
  
} catch (error) {
  console.error('\n❌ Setup failed:', error.message)
  console.log('\n💡 Make sure you have:')
  console.log('   1. PostgreSQL running')
  console.log('   2. Correct DATABASE_URL in .env.local')
  console.log('   3. Database permissions')
  process.exit(1)
}