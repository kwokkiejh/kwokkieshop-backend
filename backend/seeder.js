import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import Order from "./model/orderModel.js";
import users from "./data/user.js";
import products from "./data/products.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

// mongoose is async
const importData = async () => {
    try {
        //clear all three collections
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
