import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { Product } from "../models/Product";
import { hf } from "../utils/hf";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function test() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected to MongoDB");

  const queryEmbedding = await hf.featureExtraction({
    model: "sentence-transformers/all-MiniLM-L6-v2",
    inputs: "going to gym",
  });
  
  console.log("Got query embedding, running $search...");

  try {
    const products = await Product.aggregate([
      {
        $search: {
          index: "vector_index", 
          knnBeta: {
            vector: queryEmbedding as number[],
            path: "embedding",
            k: 10
          }
        },
      }
    ]);

    console.log("$search (knnBeta) Results count:", products.length);
    if (products.length > 0) {
      console.log("First result:", products[0].title);
    }
  } catch (error) {
    console.error("$search failed:", error);
  }

  process.exit(0);
}

test().catch(console.error);
