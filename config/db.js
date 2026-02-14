import mongoose from "mongoose";



const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DATABASE IS CONNECTED SUCCESSFULLY");
    })

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
