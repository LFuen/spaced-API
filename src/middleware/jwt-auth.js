const { JsonWebTokenError } = require('jsonwebtoken')
const AuthService = require('../auth/auth-service')

async function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || ''

  let bearerToken
  if (!authToken.toLowerCase().startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' })
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken)

    const user = await AuthService.getUserWithUserName(
      req.app.get('db'),
      payload.sub,
    )
    console.log(user)

    if (!user)
      return res.status(401).json({ error: 'Unauthorized request' })

    req.user = user
    next()
  } catch (error) {
    console.log('words')
    if (error instanceof JsonWebTokenError)
      return res.status(401).json({ error: 'Unauthorized request' })

    next(error)
  }
}

module.exports = {
  requireAuth,
}
