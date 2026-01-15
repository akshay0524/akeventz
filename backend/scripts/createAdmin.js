import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@pec.edu';
        const adminPassword = 'adminpassword123'; // Change this!

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const admin = new User({
            name: 'System Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            status: 'active',
        });

        await admin.save();
        console.log(`Admin created successfully!`);
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
