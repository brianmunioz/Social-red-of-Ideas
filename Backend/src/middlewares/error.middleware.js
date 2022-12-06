module.exports = (err, req, res, next) => {
    const httpsStatus = err.status || 500;

    return res.status(httpsStatus).send(
        {
            status: httpsStatus,
            message: err.message || "Server error"
        }
    )
};