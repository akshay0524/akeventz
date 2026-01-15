import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Event from '../models/Event.js'; // Assuming you have an Event model
import { connectDB } from '../config/db.js';

dotenv.config();

const checkDatabase = async () => {
    try {
        await connectDB();
        console.log('\n📊 === DATABASE REPORT === 📊');

        // 1. List Users
        const users = await User.find({}, 'name email role status');
        console.log(`\n👥 Users (${users.length}):`);
        if (users.length === 0) console.log('   (No users found)');
        users.forEach(u => {
            console.log(`   - [${u.role.toUpperCase()}] ${u.name} (${u.email}) - ${u.status}`);
        });

        // 2. Count Events
        // Note: We are using mongoose models directly. If Event model isn't imported correctly in your actual setup, this might fail, 
        // but the file lists 'Event.js' in models so it should work if the file exists.
        try {
            const eventCount = await mongoose.connection.db.collection('events').countDocuments();
            console.log(`\n📅 Events: ${eventCount}`);
        } catch (e) {
            console.log('\n📅 Events: (Could not check count)');
        }

        // 3. Count Bookings
        try {
            const bookingCount = await mongoose.connection.db.collection('bookings').countDocuments();
            console.log(`🎫 Bookings: ${bookingCount}`);
        } catch (e) {
            console.log('🎫 Bookings: (Could not check count)');
        }

        console.log('\n==========================\n');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error checking DB:', error);
        process.exit(1);
    }
};

checkDatabase();
