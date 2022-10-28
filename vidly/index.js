const winston = require("winston");
const express = require("express");
const app = express();
require("dotenv").config();
const error = require("./middleware/error-middleware");
const hello = require("./routes/hello-route");
const genres = require("./routes/genre-route");
const customers = require("./routes/customer-route");
const movies = require("./routes/movie-route");
const rentals = require("./routes/rental-route");
const users = require("./routes/user-route");
const auth = require("./routes/auth-route");

process.on("uncaughtException", (e) => {
  console.log("SYSTEM ERROR");
  winston.error(e.message, e);
});

winston.add(winston.transports.File, { filename: "logfile.log" });

const mongoose = require("mongoose");
const { application } = require("express");
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.error("MongoDB connection failed"));
mongoose.set("useCreateIndex", true);

app.use(express.json());
app.use("/", hello);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
