import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

    // If no token, send 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    // Verify token and decode it
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        // Attach decoded data (user ID) to the request object
        req.user = decoded; // decoded is typically the payload, e.g., { id: <userId> }

        next(); // Call next() to proceed to the next middleware or route handler
    });
};

export default authMiddleware;
