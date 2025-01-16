import { connect } from 'mongoose';

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cd8b6dz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    const mongoConnnection = await connect(DB_URL);
    console.log(`MongoDB Connected: ${mongoConnnection.connection.host}`);
  } catch (error) {
    console.error('Database connection failed', error);
  }
};

export default connectDB;
