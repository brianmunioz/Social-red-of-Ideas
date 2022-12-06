module.exports = {
    notFoundMiddleWare: require('./not-found.middleware'),
    errorMiddleWare: require('./error.middleware'),
    AuthMiddleWare: require('./auth.middleware'),
    parseIntMiddleWare: require('./parse-int.middleware'),
    cacheMiddleWare: require('./cache.middleware')
}