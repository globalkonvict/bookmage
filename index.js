require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./backend/routes/authRoutes");
const bookRoutes = require("./backend/routes/bookRoutes");
const errorMiddleware = require("./backend/middlewares/errorMiddleware");

const app = express();

app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
