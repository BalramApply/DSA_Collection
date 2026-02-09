const Admin = require('../models/Admin');

/**
 * Seeds the admin account if it doesn't exist
 * This runs automatically when the server starts
 */
const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (adminExists) {
      console.log('ℹ️  Admin already exists. Skipping seed.');
      return;
    }

    // Create new admin
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin account created successfully!');
    console.log(`📧 Email: ${admin.email}`);
    console.log('🔐 Password: (from environment variable)');
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
  }
};

module.exports = seedAdmin;