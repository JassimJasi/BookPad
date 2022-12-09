const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const fileUpload = require("express-fileupload");
const path = require("path");

const { readdirSync } = require("fs");
const app = express();
// const options = {
//   origin: "http://localhost:3000",
//   useSuccessStatus: 200,
// };
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

//<<<<<<<<<<<<<ROUTES>>>>>>>>>>>>>>>>>>>>>>>>>>>
// const useRouters = require("./routes/user");
// app.use("/", useRouters);
//<<<<<<<<<<<<<daynamic way to route page>>>>>>>>>>>>>
readdirSync("./routes").map((rou) => {
  app.use("/", require("./routes/" + rou));
});

//<<<<<<<<<<<<<DATABASE>>>>>>>>>>>>>>>>>>>>>>>>>>>
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connection to database ", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
