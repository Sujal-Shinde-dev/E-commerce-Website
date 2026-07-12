import { Router, type Request, type Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Category } from "../../models/Category";
import { ok } from "../../utils/envelope";
import { Product } from "../../models/Product";
import { requireFound } from "../../utils/helpers";
import { hf } from "../../utils/hf";

export const customerProductRouter = Router();

type ProductSort = "recent" | "price-low" | "price-high";

type ProductAppliedFilterListQuery = {
  category?: string;
  brand?: string;
  color?: string;
  size?: string;
  sort?: ProductSort;
};

customerProductRouter.get(
  "/categories",

  asyncHandler(async (_req: Request, res: Response) => {
    const categories = await Category.find({}).sort({ name: 1 });

    res.json(ok(categories));
  }),
);

customerProductRouter.get(
  "/products/search",
  asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.q as string;
    if (!query) {
      res.json(ok([]));
      return;
    }

    // 1. Convert the query into an embedding
    const queryEmbedding = await hf.featureExtraction({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: query,
    });

    // 2. Perform Vector Search in MongoDB Atlas (using the $search mapping format)
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
      },
      {
        $match: {
          status: "active",
        },
      },
      {
        $project: {
          embedding: 0, // Exclude the embedding from the response
        },
      },
    ]);
    
    // We optionally populate category since aggregate doesn't populate by default
    const populatedProducts = await Product.populate(products, { path: "category", select: "name" });

    res.json(ok(populatedProducts));
  })
);

customerProductRouter.get(
  "/products",

  asyncHandler(
    async (
      req: Request<{}, {}, {}, ProductAppliedFilterListQuery>,
      res: Response,
    ) => {
      const category = (req.query.category || "").trim();
      const brand = (req.query.brand || "").trim();
      const color = (req.query.color || "").trim();
      const size = (req.query.size || "").trim();
      const sort: ProductSort = req.query.sort || "recent";

      const query: Record<string, unknown> = {
        status: "active",
      };

      if (category) {
        query.category = category;
      }
      if (brand) {
        query.brand = brand;
      }
      if (color) {
        query.colors = color;
      }
      if (size) {
        query.sizes = size;
      }

      let sortOption: Record<string, 1 | -1> = { createdAt: -1 };

      if (sort === "price-low") {
        sortOption = { price: 1 };
      }

      if (sort === "price-high") {
        sortOption = { price: -1 };
      }

      const products = await Product.find(query)
        .populate("category", "name")
        .sort(sortOption);

      res.json(ok(products));
    },
  ),
);

customerProductRouter.get(
  "/products/:id",

  asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;

    const product = await Product.findOne({
      _id: productId,
      status: "active",
    }).populate("category", "name");

    const foundProduct = requireFound(product, "Product not found", 404);

    const relatedProducts = await Product.find({
      _id: { $ne: foundProduct._id },
      category: foundProduct.category,
      status: "active",
    })
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(4);

    res.json(
      ok({
        product: foundProduct,
        relatedProducts,
      }),
    );
  }),
);
