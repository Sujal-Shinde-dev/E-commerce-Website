import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { User } from "./models/User";
import { Category } from "./models/Category";
import { Product } from "./models/Product";
import { Banner } from "./models/Banner";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB...");

    // Find the admin user
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      console.log("No admin user found! Please sign in to the app first so your admin user is created in the database.");
      process.exit(1);
    }

    console.log("Clearing existing categories, products, and banners...");
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Banner.deleteMany({});

    // 1. Create Categories
    const categoriesData = [
      { name: "Men's Apparel" },
      { name: "Women's Apparel" },
      { name: "Footwear" },
      { name: "Accessories" }
    ];

    const insertedCategories = await Category.insertMany(categoriesData);
    console.log(`Created ${insertedCategories.length} Categories.`);

    const getCat = (name: string) => insertedCategories.find(c => c.name === name)?._id;

    // 2. Create 15 Products
    const productsData = [
      {
        title: "Classic White T-Shirt",
        description: "A premium cotton classic white t-shirt suitable for everyday casual wear. Breathable and comfortable.",
        category: getCat("Men's Apparel"),
        brand: "Essentials",
        stock: 150,
        colors: ["White"],
        sizes: ["S", "M", "L", "XL"],
        price: 25,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80", publicId: "seed_1", isCover: true }]
      },
      {
        title: "Vintage Denim Jacket",
        description: "Rugged and stylish vintage denim jacket. Features button-up front and classic stitching.",
        category: getCat("Men's Apparel"),
        brand: "Levi's",
        stock: 40,
        colors: ["Blue"],
        sizes: ["M", "L", "XL"],
        price: 85,
        salePercentage: 10,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=500&q=80", publicId: "seed_2", isCover: true }]
      },
      {
        title: "Women's Summer Floral Dress",
        description: "Lightweight and flowy floral dress perfect for warm summer days. Features a V-neck and a cinched waist.",
        category: getCat("Women's Apparel"),
        brand: "Zara",
        stock: 65,
        colors: ["Red", "White"],
        sizes: ["S", "M"],
        price: 45,
        salePercentage: 20,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80", publicId: "seed_3", isCover: true }]
      },
      {
        title: "High-Waist Yoga Leggings",
        description: "Stretchy, squat-proof, and comfortable high-waist leggings for your daily workout.",
        category: getCat("Women's Apparel"),
        brand: "Lululemon",
        stock: 120,
        colors: ["Black", "Grey"],
        sizes: ["S", "M", "L"],
        price: 98,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=500&q=80", publicId: "seed_4", isCover: true }]
      },
      {
        title: "Men's Running Sneakers",
        description: "Lightweight mesh running sneakers with responsive cushioning for maximum comfort.",
        category: getCat("Footwear"),
        brand: "Nike",
        stock: 80,
        colors: ["Black", "White"],
        sizes: ["M", "L", "XL"],
        price: 130,
        salePercentage: 15,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80", publicId: "seed_5", isCover: true }]
      },
      {
        title: "Classic Canvas Sneakers",
        description: "The timeless low-top canvas sneaker that goes with literally any outfit.",
        category: getCat("Footwear"),
        brand: "Converse",
        stock: 200,
        colors: ["White", "Black"],
        sizes: ["S", "M", "L"],
        price: 60,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80", publicId: "seed_6", isCover: true }]
      },
      {
        title: "Minimalist Leather Watch",
        description: "Sleek and elegant leather watch with a minimalist dial. Perfect for both casual and formal settings.",
        category: getCat("Accessories"),
        brand: "Daniel Wellington",
        stock: 30,
        colors: ["Brown", "Black"],
        sizes: [],
        price: 150,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80", publicId: "seed_7", isCover: true }]
      },
      {
        title: "Polarized Aviator Sunglasses",
        description: "Classic aviator sunglasses with polarized lenses to protect your eyes from harsh UV rays.",
        category: getCat("Accessories"),
        brand: "Ray-Ban",
        stock: 55,
        colors: ["Gold", "Silver"],
        sizes: [],
        price: 165,
        salePercentage: 25,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80", publicId: "seed_8", isCover: true }]
      },
      {
        title: "Cozy Knit Sweater",
        description: "Warm and cozy oversized knit sweater for the winter season.",
        category: getCat("Women's Apparel"),
        brand: "H&M",
        stock: 90,
        colors: ["Beige", "Grey"],
        sizes: ["M", "L"],
        price: 35,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80", publicId: "seed_9", isCover: true }]
      },
      {
        title: "Slim Fit Chinos",
        description: "Comfortable and stretchy slim-fit chinos for everyday office or casual wear.",
        category: getCat("Men's Apparel"),
        brand: "Dockers",
        stock: 75,
        colors: ["Khaki", "Navy"],
        sizes: ["M", "L", "XL"],
        price: 55,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=500&q=80", publicId: "seed_10", isCover: true }]
      },
      {
        title: "Premium Leather Backpack",
        description: "Durable and stylish genuine leather backpack with a dedicated laptop sleeve.",
        category: getCat("Accessories"),
        brand: "Fossil",
        stock: 20,
        colors: ["Brown"],
        sizes: [],
        price: 200,
        salePercentage: 10,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80", publicId: "seed_11", isCover: true }]
      },
      {
        title: "Athletic Zip-Up Hoodie",
        description: "Moisture-wicking athletic hoodie designed for outdoor training and running.",
        category: getCat("Men's Apparel"),
        brand: "Under Armour",
        stock: 60,
        colors: ["Black", "Charcoal"],
        sizes: ["M", "L", "XL"],
        price: 70,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80", publicId: "seed_12", isCover: true }]
      },
      {
        title: "Women's Ankle Boots",
        description: "Chic leather ankle boots featuring a subtle heel, perfect for autumn outfits.",
        category: getCat("Footwear"),
        brand: "Steve Madden",
        stock: 45,
        colors: ["Black", "Brown"],
        sizes: ["S", "M"],
        price: 110,
        salePercentage: 15,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80", publicId: "seed_13", isCover: true }]
      },
      {
        title: "Silk Neck Scarf",
        description: "Elegant 100% pure silk neck scarf with vibrant abstract patterns.",
        category: getCat("Accessories"),
        brand: "Gucci",
        stock: 15,
        colors: ["Multi"],
        sizes: [],
        price: 190,
        salePercentage: 0,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=500&q=80", publicId: "seed_14", isCover: true }]
      },
      {
        title: "Graphic Skateboard Tee",
        description: "Oversized cotton tee featuring an edgy skateboard graphic print on the back.",
        category: getCat("Men's Apparel"),
        brand: "Vans",
        stock: 100,
        colors: ["Black", "White"],
        sizes: ["S", "M", "L", "XL"],
        price: 30,
        salePercentage: 5,
        status: "active",
        createdBy: adminUser._id,
        images: [{ url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80", publicId: "seed_15", isCover: true }]
      }
    ];

    await Product.insertMany(productsData);
    console.log(`Successfully seeded ${productsData.length} Products!`);
    
    // 3. Create 3 Banners
    const bannersData = [
      {
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
        imagePublicId: "banner_1",
        createdBy: adminUser._id
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        imagePublicId: "banner_2",
        createdBy: adminUser._id
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        imagePublicId: "banner_3",
        createdBy: adminUser._id
      }
    ];

    await Banner.insertMany(bannersData);
    console.log(`Successfully seeded ${bannersData.length} Banners!`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedProducts();
