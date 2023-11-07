const mongoose = require("mongoose");
const { LINK } = process.env;

const mongoConnect = async () => {
  try {
    await mongoose.connect(LINK);
  } catch (error) {
    console.log(`We has any problems with connection to db. Error:${error}`);
  }
};
module.exports = mongoConnect;
