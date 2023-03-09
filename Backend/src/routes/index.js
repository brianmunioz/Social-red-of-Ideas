const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const multer = require('multer')

const compression = require("compression");
const { errorMiddleWare, notFoundMiddleWare } = require('../middlewares');
require('express-async-errors');

module.exports = function ({ UploadRoutes, AuthRoutes, CommentRoutes, IdeaRoutes, UserRoutes, VoteRoutes, SuspendedUsersRoutes, ReportedIdeasRoutes }) {
    const router = express.Router();
    const apiRoutes = express.Router();

    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());

    router.use("/v1/api", apiRoutes);
    router.use('', () => { })
    router.use(multer().single('image'));
    apiRoutes.use(multer().single('image'));
    apiRoutes.use('/images', multer().single('image'));
    apiRoutes.use('/images', express.static('public/img_profile'));
    apiRoutes.use("/comment", CommentRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/auth", AuthRoutes);
    apiRoutes.use("/vote", VoteRoutes);
    apiRoutes.use("/upload", UploadRoutes);
    apiRoutes.use("/reported", ReportedIdeasRoutes);
    apiRoutes.use("/suspended", SuspendedUsersRoutes)


    router.use(notFoundMiddleWare);
    router.use(errorMiddleWare);
    return router;
}