/* defines an object called `ERROR_HANDLERS` which contains different error handling
functions. Each function is associated with a specific error type. */
const ERROR_HANDLERS = {

    defaultError : res => res.status(500).end(),

    CastError : res => res.status(400).send({ error: 'id used is malformed'}),

    JsonWebTokenError : res => res.status(401).send({ error: "auth token is missing or invalid"}),

    TokenExpirerError: res => res.status(401).send({ error: "your session has expired!"})
}

module.exports = (error, request, response, next) => {

    console.error(error)

    return ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError(response)
    
}