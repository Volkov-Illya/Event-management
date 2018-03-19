'use strict'

class ProjectError extends Error {

    constructor ( message, status, code ) {

        super( message )

        this.message = message
        this.text = status
        this.code = code

    }

}

module.exports.serverError = ( err ) => {

    const error = new ProjectError( 'SERVER_ERROR', err, 500 )

    return error

}

module.exports.unauthorised = ( err ) => {

    const error = new ProjectError( 'UNAUTHORISED', err, 401 )

    return error

}

module.exports.notFound = ( err ) => {

    const error = new ProjectError( 'NOT_FOUND', err, 404 )

    return error

}

module.exports.badRequest = ( err ) => {

    const error = new ProjectError( 'BAD_REQUEST', err, 400 )

    return error

}

module.exports.forbidden = ( err ) => {

    const error = new ProjectError( 'FORBIDDEN', err, 403 )

    return error

}

module.exports.invalidJoi = ( err ) => {

    let result = ''

    for ( const error of err.details ) {

        result += error.message + '; '

    }

    return this.badRequest( result )

}
