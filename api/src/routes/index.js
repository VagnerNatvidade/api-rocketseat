// import Router from express
const { Router } = require("express");

// a route
const usersRouter = require("./users.routes.js");
const notesRouter = require("./notes.routes.js");
const tagsRouter = require("./tags.routes.js");
const sessionRouter = require("./sessions.routes.js");

// groups all routes
const routes = Router();

// (route, group)
routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsRouter);
routes.use("/sessions", sessionRouter);

// export routes
module.exports = routes;
