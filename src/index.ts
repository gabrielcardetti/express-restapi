import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes"
import * as cors from "cors";
import { errorMiddleware } from "./modules/common/mids/errorHandler";

createConnection().then(async connection => {

    // create express app
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    // register express routes from defined application routes
    app.use("/", routes);
    app.use(errorMiddleware);

    app.listen(3000);

    console.log("Express server has started on port 3000");

}).catch(error => console.log(error));
