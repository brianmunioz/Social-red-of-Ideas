const express = require('express');
const cors = require('cors');//permite controlar peticiones http asincronicas de origen cruzado (es decir desde un link externo en este caso mongodb) Es para mayor seguridad
const helmet = require('helmet'); //Te ayuda con brechas de seguridad
const compression = require("compression");//ayuda a comprimir peticiones http 
const { errorMiddleWare, notFoundMiddleWare } = require('../middlewares'); //Si llega a ocurrir un error
require('express-async-errors');

module.exports = function ({ AuthRoutes, CommentRoutes, IdeaRoutes, UserRoutes, VoteRoutes }) {
    const router = express.Router();
    const apiRoutes = express.Router();

    //configuracion de las rutas express.json() es para que te devuelva un json las rutas
    apiRoutes
        .use(express.json())
        .use(cors())
        .use(helmet())
        .use(compression());



    //ruta principal (por ejemplo : pagina.com/v1/api)
    router.use("/v1/api", apiRoutes);

    //Aqui van las rutas luego de lo anterior. por ejemplo: pagina.com/v1/api/home, pagina.com/v1/api/listausuarios
    apiRoutes.use("/comment", CommentRoutes);
    apiRoutes.use("/idea", IdeaRoutes);
    apiRoutes.use("/user", UserRoutes);
    apiRoutes.use("/auth", AuthRoutes);
    apiRoutes.use("/vote", VoteRoutes);




    //en casoa de fallos en la url por parte del servidor o el cliente
    router.use(notFoundMiddleWare);
    router.use(errorMiddleWare);
    return router;
}