import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string }>(event)
  
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })
  
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }
  
  const token = Buffer.from(`${user.id}:${user.email}`).toString('base64')
  
  return { token, user: { id: user.id, email: user.email, name: user.name } }
})