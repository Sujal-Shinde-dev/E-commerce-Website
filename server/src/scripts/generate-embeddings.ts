import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { Category } from "../models/Category";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { hf } from "../utils/hf";

// ensure models are registered
Category.init();
User.init();


dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const generateEmbeddings = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB...");

    // Find products that don't have an embedding or if you want to re-run for all
    const products = await Product.find({}).populate("category");
    
    console.log(`Found ${products.length} products. Generating embeddings...`);

    for (const product of products) {
      // Combine fields into a rich text for embedding
      const textToEmbed = `Title: ${product.title}. Description: ${product.description}. Brand: ${product.brand}. Category: ${(product.category as any)?.name || ''}.`;
      
      const output = await hf.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: textToEmbed,
      });

      // Output is an array of numbers (the embedding vector)
      product.embedding = output as number[];
      await product.save();
      
      console.log(`Successfully generated embedding for: ${product.title}`);
    }

    console.log("Finished generating all embeddings.");
    process.exit(0);
  } catch (error) {
    console.error("Error generating embeddings:", error);
    process.exit(1);
  }
};

generateEmbeddings();
