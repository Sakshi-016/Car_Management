import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    tags: [String],
    images: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);

export default Car;
