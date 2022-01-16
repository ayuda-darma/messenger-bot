exports.notFound = (req, res) => {
    res.status(404).json({
        error: 'Not found',
        data: null
    })
}

exports.internalServerError = (err, req, res, next) => {
    res.status(500).json({
        error: 'Internal server error',
        data: null
    })
}