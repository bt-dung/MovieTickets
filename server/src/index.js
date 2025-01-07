const express = require("express");
const dotenv = require("dotenv");
const { createTableDB } = require("./database/createDB");
const { connectDB } = require("./database/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { insertData, insertGenres } = require('./database/updateDB');
const authRoute = require('./routes/auth.route')
const verification = require('./routes/verify.route')
const Showtime = require('./routes/showtime.route')
const Movies = require("./routes/movie.route");
const User = require("./routes/user.route");
const Theater = require("./routes/theater.route")
const Area = require("./routes/area.route");
const movieTheater = require("./routes/movieTheater.route");

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["POST,GET,PUT,DELETE,PATCH"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/user", verification);
app.use("/api/v1", authRoute);
app.use("/admin", Showtime);
app.use("/admin", Movies);
app.use("/admin", User);
app.use("/api/v1", Theater);
app.use("/api/v1/", Area);
app.use("/api/v1", movieTheater)


createTableDB();
connectDB();
insertGenres();
insertData();
app.listen(PORT, () =>
    console.log(`Server started on port:http://localhost:${PORT}`)
);
