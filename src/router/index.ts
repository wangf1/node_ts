import express from "express";

import authentications from "./authentications";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  authentications(router);
  users(router);
  return router;
};
