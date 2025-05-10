import express from 'express';
import userModel from '../models/users.js';
import generateToken from '../utils/generateToken.js';  


const router = express.Router();

 router.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const newUser = new userModel({ userName, email, password }); // Fixed: use 'new' keyword
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: newUser });

    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'An error occurred', error });
    }
});

 router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await user.comparePassword(password);  

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            user: {
                userName: user.userName,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error('An error occurred:', error);
        return res.status(500).json({ message: 'An error occurred', error });
    }
});

export default router;
