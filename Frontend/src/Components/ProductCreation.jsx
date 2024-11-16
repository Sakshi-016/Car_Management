import React, { useState } from "react";
import axios from "axios";

const ProductCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Check if the selected files are less than 10
    if (files.length > 10) {
      setError("You can only upload up to 10 images.");
    } else {
      setError(""); // Clear error if the condition is met
      setImages(files); // Set the images
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (images.length < 10) {
    //   setError("Please select at least 10 images.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    images.forEach((image) => formData.append("images", image));

    try {
      const token = sessionStorage.getItem("token");
  
      const response = await axios.post("http://localhost:5000/api/cars/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess(response.data.message);
      setTitle("");
      setDescription("");
      setTags("");
      setImages([]);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Create a New Product</h1>

      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-2">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="title">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full p-2 border rounded-md"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="images">
            Upload Images (at least 10)
          </label>
          <input
            type="file"
            id="images"
            className="w-full p-2"
            multiple
            accept="image/png, image/jpeg , image/jpg"
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
          // disabled={images.length < 10} // Disable submit if less than 10 images are selected
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreation;
