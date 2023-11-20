const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 60000,
            // retryWrites: true,
            // w: "majority"
        });
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        console.log(1);
    }
}

module.exports = connectDB;


