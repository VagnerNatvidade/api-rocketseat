require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");

// import the packages of file express
const express = require("express");
const AppError = require("./utils/AppError.js");

// import routes
const routes = require("./routes");

migrationsRun();

// run express
const app = express();
// say which format will send
app.use(express.json());

app.use(routes);

// express-async-errors
app.use((error, req, res, next) => {
  // error = AppError > client error
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  // server error
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

// set a port to the app
const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
