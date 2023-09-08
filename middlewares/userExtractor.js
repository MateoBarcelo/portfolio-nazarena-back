const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    const authHeader = request.get("authorization")

    let token = ''
    if(authHeader && authHeader.toLowerCase().startsWith('bearer')) {
        token = authHeader.substring(7) // "Bearer .(token)" 7 until (token)
    }

    let decodedToken = ''

    try {decodedToken = jwt.verify(token, process.env.SECRET)} catch(err) {next(err)}

    if(!token || !decodedToken) {
        return response.status(401).json({error: "auth token invalid or is missing"})
    }

    request.userId = decodedToken.id

    next()
}