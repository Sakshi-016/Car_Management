import Car from "../models/Car.js";
import User from "../Models/User.js";

// Create a new car
export const createCar = async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files.map((file) => file.path); // Get file paths of uploaded images

    if (images.length > 10) {
        return res.status(400).json({ error: 'You can only upload up to 10 images' });
    }

    try {
        // Ensure req.user is present and contains user data (set by authMiddleware)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'Unauthorized: User ID is missing or invalid' });
        }

        // Create the car entry using the user ID from the token
        const car = await Car.create({
            title,
            description,
            tags: tags ? tags.split(',') : [], // Convert comma-separated tags to an array
            images,
            userId: req.user.id, // Assign the user ID from the token
        });

        // Add the car's ID to the user's cars array
        await User.findByIdAndUpdate(req.user.id, { $push: { cars: car._id } });

        res.status(201).json({ message: 'Car created successfully', car });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getAllCars = async (req, res) => {
    try {
        // Ensure req.user is present and contains user data (set by authMiddleware)
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: 'User ID is missing or invalid' });
        }

        // Fetch cars for the logged-in user
        const cars = await Car.find({ userId: req.user.id });

        // Check if the user has cars
        if (!cars || cars.length === 0) {
            return res.status(404).json({ message: 'No cars found for this user' });
        }

        res.status(200).json({ cars });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCarDetails = async (req, res) => {
    const { carId } = req.params;  // Get carId from route params

    try {
        // Ensure the user is authenticated and their ID is available
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: 'User ID is missing or invalid' });
        }

        // Find the car by ID and ensure it's associated with the logged-in user
        const car = await Car.findOne({ _id: carId, userId: req.user.id });

        // Check if the car is found
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Return the car details
        res.status(200).json({ car });
    } catch (err) {
        console.error('Error fetching car details:', err);
        res.status(500).json({ error: err.message });
    }
};

export const updateCar = async (req, res) => {
    const { carId } = req.params;  // Get carId from route params
    const { title, description, tags } = req.body;  // Get updated fields from request body
    const images = req.files ? req.files.map((file) => file.path) : []; // Handle images if provided

    try {
        // Ensure the user is authenticated and their ID is available
        if (!req.user || !req.user.id) {
            return res.status(400).json({ error: 'User ID is missing or invalid' });
        }

        // Find the car by ID and ensure it belongs to the logged-in user
        const car = await Car.findOne({ _id: carId, userId: req.user.id });

        // Check if the car is found
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        // Update the fields with the new values if provided
        if (title) car.title = title;
        if (description) car.description = description;
        if (tags) car.tags = tags.split(',');  // Convert comma-separated tags to an array
        if (images.length > 0) car.images = images;  // Only update images if new ones are provided

        // Save the updated car details
        await car.save();

        // Return the updated car details
        res.status(200).json({ message: 'Car updated successfully', car });
    } catch (err) {
        console.error('Error updating car:', err);
        res.status(500).json({ error: err.message });
    }
};


// Delete a car by ID
export const deleteCar = async (req, res) => {
    const { carId } = req.params;

    try {
        // Find the car by ID and ensure the car belongs to the logged-in user
        const car = await Car.findOne({ _id: carId, userId: req.user.id });

        if (!car) {
            return res.status(404).json({ error: 'Car not found or not owned by the user' });
        }

        // Delete the car using deleteOne method
        await Car.deleteOne({ _id: carId });

        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Global Search for Cars based on title, description, and tags
export const searchCars = async (req, res) => {
    const { keyword } = req.query; // Fetch the query parameter
    if (!keyword) {
        return res.status(400).json({ error: 'Please provide a search keyword' });
    }
    try {
        const cars = await Car.find({
            userId: req.user.id, // Ensure the cars belong to the authenticated user
            $or: [
                { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive title match
                { description: { $regex: keyword, $options: 'i' } }, // Case-insensitive description match
                { tags: { $in: [new RegExp(keyword, 'i')] } } // Case-insensitive tag match
            ]
        });
        if (cars.length === 0) {
            return res.status(404).json({ message: 'No cars found matching the search criteria' });
        }
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


