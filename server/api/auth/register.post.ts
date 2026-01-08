import bcrypt from 'bcrypt'
import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string; name?: string }>(event)
  
  const hashedPassword = await bcrypt.hash(body.password, 10)
  
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name
      }
    })
    
    const token = Buffer.from(`${user.id}:${user.email}`).toString('base64')
    
    return { token, user: { id: user.id, email: user.email, name: user.name } }
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 400, message: 'User already exists' })
  }
})