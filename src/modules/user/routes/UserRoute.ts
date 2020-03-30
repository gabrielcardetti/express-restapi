import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../../common/mids/checkJwt";
import { checkRole } from "../../common/mids/checkRole";
import { UserRole } from "../model/User";

const { SUPER_ADMIN, ADMIN, USER } = UserRole;

const router = Router();

router.get("/", [checkJwt, checkRole([SUPER_ADMIN])], UserController.listAll);
router.post("/", [checkJwt, checkRole([SUPER_ADMIN])], UserController.newUser);

router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole([SUPER_ADMIN])],
  UserController.getOneById
);

router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole([SUPER_ADMIN])],
  UserController.editUser
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole([SUPER_ADMIN])],
  UserController.deleteUser
);

router.post("/changue-password", [checkJwt, checkRole([SUPER_ADMIN, ADMIN, USER])], UserController.editPassword);

export default router;