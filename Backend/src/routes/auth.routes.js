const { Router } = require('express');
module.exports = function ({ AuthController }) {
    const router = Router();
    router.post("/signin", AuthController.signIn);
    router.post("/signup", AuthController.signUp);
    return router;
};