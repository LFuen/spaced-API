module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL
    || 'postgres://kmuvgqbpfrbnkz:568f1ec6d609ba96b707bb399b735765ebfadfa9b035ee39749236adf63243d9@ec2-35-172-246-19.compute-1.amazonaws.com:5432/db8m6ovjkil0v2',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}
