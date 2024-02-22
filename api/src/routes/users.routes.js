// import router from express
const { Router } = require("express");

// import usersController
const UsersController = require("../controllers/usersController");

const usersController = new UsersController();

// initialize router
const usersRoutes = Router();

// Middleware
const myMiddleware = (req, res, next) => {
  console.log("U passed through Middleware");
  if (!req.body.isAdmin) {
    return res.status(401).json({ message: "user unauthorized" });
  }
  next();
};

// method POST / verb HTTP POST
usersRoutes.post("/", usersController.create);
usersRoutes.put("/:id", usersController.update);

// export userRoutes
module.exports = usersRoutes;
