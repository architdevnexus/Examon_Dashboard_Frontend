import dotenv from 'dotenv';
dotenv.config();

import blogModel from '../model/blogModel.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { v2 as cloudinary} from 'cloudinary';
import mongoose from 'mongoose';
import fs from 'fs';

console.log("Cloudinary config:", {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
});

export const BlogController = async (req, res) => {
    try {
        console.log("=== BlogController payload ===");
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        const { title, blogContent, tag } = req.body;
        // const featured = req.body.featured === 'true' || req.body.featured === true;
        const featuredImagePath = req.file?.path;

        if (!title || !blogContent || !tag) {
            return res.status(400).json({
                message: "Missing required fields",
                received: { title, blogContent, tag}
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Upload image
        const uploadedImage = await uploadOnCloudinary(featuredImagePath);

        if (!uploadedImage || !uploadedImage.secure_url) {
            return res.status(500).json({
                success: false,
                message: "Image upload to Cloudinary failed",
            });
        }

        // Save blog
        const newBlog = new blogModel({
            title,
            blogContent,
            img: uploadedImage.secure_url,
            tag
        });

        await newBlog.save();

        res.status(201).json({ message: "Blog saved successfully!" });

    } catch (err) {
        console.error("Full error details:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

export const AllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(blogs);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch blogs' });
    }
}


// GET /api/blogs/:id
export const getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the id string
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }

        //  Look up the blog
        const blog = await blogModel.findById(id);

        //  Handle “not found”
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Return the blog
        res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching blog' });
    }
};

export const BlogImageController = async (req, res) => {
    try {
        const localPath = req.file?.path;
        console.log("localPath", localPath);


        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(localPath, {
            folder: "blogs"
        });

        // Remove local file after upload
        fs.unlinkSync(localPath);

        res.status(200).json({ url: result.secure_url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Image upload failed" });
    }
};