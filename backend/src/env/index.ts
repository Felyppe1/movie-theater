import 'dotenv/config'
import zod from 'zod'

const envSchema = zod.object({
  NODE_ENV: zod.enum(['dev', 'test', 'production']).default('dev'),
  PORT: zod.coerce.number().default(3333),
  FRONTEND_URL: zod.string().min(1),
  DATABASE_URL: zod.string().min(1),

  SECRET_TOKEN: zod.string().min(1),
  TOKEN_EXPIRES_IN: zod.string().min(1),
  SECRET_REFRESH_TOKEN: zod.string().min(1),
  REFRESH_TOKEN_EXPIRES_IN: zod.string().min(1),
})

const _env = envSchema.safeParse(process.env)

if (_env.success == false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data