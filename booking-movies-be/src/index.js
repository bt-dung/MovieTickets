const express = require('express')
const dotenv = require('dotenv')
const { createTableDB } = require('./database/createDB')
const { connectDB } = require('./database/db')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const { insertData, insertGenres } = require('./database/updateDB');
const authRoute = require('./routes/auth.route')
const verification = require('./routes/verify.route')

const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST,GET,PUT,DELETE,PATCH"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/user", verification);
app.use("/api/v1", authRoute);
createTableDB();
connectDB();
insertGenres();
insertData();
app.listen(PORT, () => console.log(`Server started on port:http://localhost:${PORT}`));