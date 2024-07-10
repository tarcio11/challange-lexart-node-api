export const env = {
  database: {
    host: process.env.POSTGRES_HOST || '',
    url: process.env.POSTGRES_URL || '',
    port: process.env.POSTGRES_PORT || '',
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || '',
  }
}