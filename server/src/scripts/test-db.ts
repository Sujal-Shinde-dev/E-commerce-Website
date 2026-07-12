import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { Product } from "../models/Product";
import { hf } from "../utils/hf";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function test() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected to MongoDB");

  const product = await Product.findOne().select("+embedding");
  if (!product) {
    console.log("No product found");
    process.exit(1);
  }

  console.log("Product title:", product.title);
  console.log("Is embedding an array?", Array.isArray(product.embedding));
  if (Array.isArray(product.embedding)) {
    console.log("Embedding length:", product.embedding.length);
    console.log("First 3 elements:", product.embedding.slice(0, 3));
    console.log("First element type:", typeof product.embedding[0]);
  } else {
    console.log("Embedding value:", typeof product.embedding, product.embedding);
  }

  // Also test the search query embedding
  const queryEmbedding = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: "running shoes",
  });
  
  console.log("Query embedding is array?", Array.isArray(queryEmbedding));
  if (Array.isArray(queryEmbedding)) {
    console.log("Query embedding length:", queryEmbedding.length);
  }
  
  process.exit(0);
}

test().catch(console.error);
