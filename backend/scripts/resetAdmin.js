import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const resetAdmin = async () => {
    try {
        await connectDB();

        const adminEmail = 'admin@pec.edu';
        const adminPassword = 'adminpassword123';

        // Delete existing admin to ensure fresh state
        await User.deleteOne({ email: adminEmail });

        const admin = new User({
            name: 'System Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin',
            status: 'active',
        });

        await admin.save();
        console.log(`✅ Admin Created/Reset Successfully!`);
        console.log(`📧 Email: ${adminEmail}`);
        console.log(`🔑 Password: ${adminPassword}`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error resetting admin:', error);
        process.exit(1);
    }
};

resetAdmin();
