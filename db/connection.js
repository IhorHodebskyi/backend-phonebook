const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

const mongoConnect = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log(`Mongodb connection to db.`);
  } catch (error) {
    console.log(`We has any problems with connection to db. Error:${error}`);
    process.exit(1);
  }
};
module.exports = mongoConnect;
