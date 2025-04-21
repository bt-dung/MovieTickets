const express = require("express");
const dotenv = require("dotenv");
const { createTableDB } = require("./database/createDB");
const { connectDB } = require("./database/db");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const SeatSocket = require("./sockets/seatSocket");
const { insertData, insertGenres } = require("./database/updateDB");
const authorize = require("./middlewares/authorizeUser");
const authRoute = require("./routes/auth.route");
const verification = require("./routes/verify.route");
const Showtime = require("./routes/showtime.route");
const Movies = require("./routes/movie.route");
const User = require("./routes/user.route");
const Theater = require("./routes/theater.route");
const Area = require("./routes/area.route");
const movieTheater = require("./routes/movieTheater.route");
const Screen = require("./routes/screen.route");
const Seat = require("./routes/seat.route");
const Invoice = require("./routes/invoice.route");
const Analystics = require("./routes/analystics.route");
const MakePaymentRoute = require("./routes/bookTicket.route");
const Service = require("./routes/service.route");
const GenreRoute = require("./routes/genre.route");

dotenv.config();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST,GET,PUT,DELETE,PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5001;
global.io = io;
SeatSocket(io);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/user", verification);
app.use("/api/v1", authRoute);
app.use("/api/v1", Showtime);
app.use("/admin", Movies);
app.use("/admin", User);
app.use("/api/v1", Theater);
app.use("/api/v1/", Area);
app.use("/api/v1", movieTheater);
app.use("/api/v1", Screen);
app.use("/api/v1", Seat);
app.use("/api/v1", Invoice);
app.use("/admin", authorize(["admin_role", "manager_role"]), Analystics);
app.use("/api/v1", MakePaymentRoute());
app.use("/api/v1", Service);
app.use("/api/v1", GenreRoute);


createTableDB();
connectDB();
insertGenres();
insertData();

server.listen(PORT, () =>
  console.log(`Server started on port:http://localhost:${PORT}`)
);
