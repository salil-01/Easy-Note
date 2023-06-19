const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { notesRouter } = require("./routes/Notes.routes");
const { userRouter } = require("./routes/User.routes");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const app = express();

//swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Swagger",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSdoc(options);

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);
app.use("/user", userRouter);

//Home Page

app.get("/", async (req, res) => {
  res.status(200).send("Home Page");
});
//protected routes
app.use(auth);
app.use("/notes", notesRouter);

//server
app.listen(process.env.PORT || 3000, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while connecting to DB");
  }
  console.log(`Server running at ${process.env.PORT || 3000}`);
});
