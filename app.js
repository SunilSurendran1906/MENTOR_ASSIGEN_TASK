const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require("path");
//DATABASE CONNECTION
require("../mentortask/database/DBconnection");
app.use(express.json());
app.use("/", express.static(path.join(__dirname, "./public")));

app.use("/", require("../mentortask/routers/root"));
app.use("/mentor", require("./routers/mentors"));
app.use("/student", require("./routers/students"));
app.use("/assign-mentor", require("./routers/students"));
app.use("/students/unassigned", require("./routers/students"));
app.use("/change-mentor", require("./routers/students"));
app.use("/mentors/all-students", require("./routers/students"));
app.use("/previous-mentor", require("./routers/students"));
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Port:${PORT} is not runing`);
  } else {
    console.log(`PORT :${PORT} is running`);
  }
});
