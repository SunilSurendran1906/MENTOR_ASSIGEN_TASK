const mongoose = require("mongoose");
const BASE_URL = "mongodb+srv://root:root@zenclass.zdq6zvy.mongodb.net/";

mongoose
  .connect(BASE_URL)
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("ERROR", err);
  });
