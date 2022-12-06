const container = require('./src/startup/container');
const server = container.resolve("server");
const { MONGO_URI } = container.resolve("config");
const mongoose = require("mongoose");
//no se debe usar  useCreateIndex, useFindAndModify porque se encuentra obsoleto

mongoose
    .connect(
        MONGO_URI,
        {
            useNewUrlParser: true
        }
    )
    .then(() => server.start())
    .catch(console.log);