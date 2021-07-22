import express from "express";
import Product from "../model/productModel.js";

//create route handler
const router = express.Router();

// get all products
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        next(error);
    }
});

// get specific product by id
// IMPT! need put 'next' parameter else will still get unhandled promise reject error
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error("Product Not Found"); // will go to catch
        }
    } catch (error) {
        next(error);
    }
});

export default router;
