const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("Db connection failed", error.message);
  }
};

dbConnect();

// password mongodb :  8zlviC859g79OmPr
