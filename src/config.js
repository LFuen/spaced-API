module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL
    || 'postgresql://lili@localhost/spaced-repetition',
  JWT_SECRET: process.env.JWT_SECRET || 'c3f5a85c-2f9d-11eb-adc1-0242ac120002',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
