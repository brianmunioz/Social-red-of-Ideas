const { Router } = require('express');
const { uploadImgMiddleWare } = require('../middlewares')

module.exports = function () {
    const router = Router();
    router.post("/image", uploadImgMiddleWare, (req, res) => {
        if (req.file == undefined) {
            const error = new Error();
            error.status = 400;
            error.message = 'You sending nothing';
            throw error;
        }
        console.log(req.file)
        return res.send({ filename: req.file.filename })
    })
    return router;
};