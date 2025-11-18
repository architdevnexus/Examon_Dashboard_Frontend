import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    tag: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

const blogModel = mongoose.model("blogModel", blogSchema);
export default blogModel;