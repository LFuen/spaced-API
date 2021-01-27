process.env.TZ = 'UCT'
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'change-this-secret'

require('dotenv').config()

process.env.DB_URL = process.env.DB_URL
  || "postgresql://lili@localhost/spaced-repetition"

const { expect } = require('chai')
const supertest = require('supertest')

global.expect = expect
global.supertest = supertest
