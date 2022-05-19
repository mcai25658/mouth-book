import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    console.log('Try connect to MongoDB....'.cyan.underline);
    const conn = await mongoose.connect(url);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error:${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;