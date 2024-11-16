import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateButton = () => {
  const { carId } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // For navigation
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setError("User not authenticated. Please log in.");
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/cars/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { title, description, tags, images } = response.data.car;
        setTitle(title);
        setDescription(description);
        setTags(tags.join(", "));
        setExistingImages(images);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch product details.");
      }
    };

    fetchProductDetails();
  }, [carId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      setError("You can only upload up to 10 images.");
    } else {
      setError("");
      setImages(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    images.forEach((image) => formData.append("images", image));

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const response = await axios.put(`http://localhost:5000/api/cars/${carId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
      navigate(`/car/${carId}`); // Redirect to the product details page
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Update Product</h1>

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
          ></textarea>
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
          <label className="block text-sm font-semibold mb-2" htmlFor="existing-images">
            Existing Images
          </label>
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${image}`}
                alt={`Product Image ${index + 1}`}
                className="w-full h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="images">
            Upload New Images (up to 10)
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
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateButton;
