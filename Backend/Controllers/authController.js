 import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Token generation utility
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },  // Adding user ID to the token payload
        process.env.JWT_SECRET,  // Secret to sign the token
        { expiresIn: '1d' }  // Token expiration time (1 day)
    );
};

// Register User
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Create a new user
        const user = await User.create({ username, email, password });

        // Generate token after registration
        const token = generateToken(user);

        // Send token in cookies
        // res.cookie('token', token, {
        //     httpOnly: true,  // Prevents JavaScript from accessing the cookie
        //     secure: process.env.NODE_ENV === 'production',  // Only sends cookie over HTTPS in production
        //     sameSite: 'strict',  // Helps prevent CSRF attacks
        //     maxAge: 24 * 60 * 60 * 1000,  // Cookie expiration time (1 day)
        // });

        res.status(201).json({
            message: 'User registered successfully',
            user,
            token,  // Optionally, you can also send the token in the response body
        });
        
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate token after successful login
        const token = generateToken(user);

        // Send token in cookies
        // res.cookie('token', token, {
        //     httpOnly: true,  // Prevents JavaScript from accessing the cookie
        //     secure: false,  // Only sends cookie over HTTPS in production
        //     sameSite: 'none',  // Helps prevent CSRF attacks
        //     maxAge: 24 * 60 * 60 * 1000,  // Cookie expiration time (1 day)
        // });
        console.log(token);
        res.status(200).json({
            message: 'Login successful',
            user,
            token,  // Optionally, you can also send the token in the response body
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
