import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION);
  } catch (error) {
    throw new Error("Error occur cannot connect");
  }
};

export default ConnectDB;
