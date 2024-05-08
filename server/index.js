const express = require("express");
const app = express();
const cors = require("cors");
const { data } = require("./data");
const port = 3001;

const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

const whitelist = [
  "http://localhost:3001",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// routes
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/users", require("./routes/user"));
app.use("/orenda", require("./routes/orenda"));
app.use("/prodaj", require("./routes/prodaj"));
app.use("/myposters", require("./routes/myposters"));

app.get("/", (req, res) => {
  res.json({
    message: data.homepage,
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
