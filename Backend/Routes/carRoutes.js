import express from 'express';
import { createCar , getAllCars , getCarDetails, updateCar ,deleteCar, searchCars } from '../Controllers/carController.js';
import upload from '../Utils/multerConfig.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const router = express.Router();
router.post(
    '/create',
    authMiddleware , // Middleware to verify user authentication
    upload.array('images', 10), // Multer middleware to handle up to 10 image uploads
    createCar
);
router.get('/all', authMiddleware, getAllCars);

// Route to get details of a particular car by its ID
router.get('/:carId', authMiddleware, getCarDetails);

// Route to update a car's details
router.put('/:carId', authMiddleware, upload.array('images', 10), updateCar); // Handle image upload if required

// DELETE route to remove a car by its ID
router.delete('/delete/:carId', authMiddleware, deleteCar);

// Search cars based on title, description, or tags
router.get('/search', authMiddleware, searchCars);

export default router