import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

dotenv.config();


const NEW_ADMIN = {
    name: 'Aksha Admin',           // Your Name
    email: 'aksha@pec.edu',        // Your Email
    password: 'mypassword123'      // Your Password
};


const createCustomAdmin = async () => {
    try {
        await connectDB();

        // Check if user exists
        const existingUser = await User.findOne({ email: NEW_ADMIN.email });

        if (existingUser) {
            // If user exists, just upgrade them to admin
            existingUser.role = 'admin';
            existingUser.password = NEW_ADMIN.password; // Update password too
            await existingUser.save();
            console.log(`\n✅ Existing user '${NEW_ADMIN.email}' has been promoted to ADMIN!`);
        } else {
            // Create new admin
            const admin = new User({
                name: NEW_ADMIN.name,
                email: NEW_ADMIN.email,
                password: NEW_ADMIN.password,
                role: 'admin',
                status: 'active',
            });
            await admin.save();
            console.log(`\n✨ New ADMIN account created for '${NEW_ADMIN.email}'!`);
        }

        console.log(`\n🔑 Login Credentials:`);
        console.log(`   Email: ${NEW_ADMIN.email}`);
        console.log(`   Password: ${NEW_ADMIN.password}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createCustomAdmin();
