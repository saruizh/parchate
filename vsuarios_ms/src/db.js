import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://users_db:27017/merndb");
        console.log("Database is connected"); 
    } catch (error) {
        console.log(error)
    }
}