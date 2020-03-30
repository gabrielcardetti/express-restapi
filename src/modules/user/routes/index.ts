import { Router } from "express";
import AuthRoute from "./AuthRoute";
import UserRoute from "./UserRoute";

const routes = Router();

routes.use("/auth", AuthRoute);
routes.use("/user", UserRoute);


export default routes;