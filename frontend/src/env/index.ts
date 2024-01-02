import zod from 'zod'

const envValidationSchema = zod.object({
  VITE_BACKEND_URL: zod.string().min(1),
  VITE_TMDB_READ_ACCESS_TOKEN: zod.string().min(1)
})

const _env = envValidationSchema.safeParse(import.meta.env)

if (_env.success == false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid invironment variables')
}

export const env = _env.data