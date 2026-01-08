import { prisma } from '../../../prisma/db'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  
  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  
  const token = authHeader.replace('Bearer ', '')
  const decoded = Buffer.from(token, 'base64').toString()
  const [userId] = decoded.split(':')
  
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    select: { id: true, email: true, name: true }
  })
  
  if (!user) {
    throw createError({ statusCode: 401, message: 'User not found' })
  }
  
  return user
})