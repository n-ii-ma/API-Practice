const express = require("express");
const app = express();

// Morgan Logger
const morgan = require("morgan");
app.use(morgan("dev"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Listening on Port ${PORT}`));
