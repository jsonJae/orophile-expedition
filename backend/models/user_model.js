import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
    {
        name: {
            first_name: {
                type: String,
                required: [true, 'First name is required']
            },
            last_name: {
                type: String,
                required: [true, 'Last name is required']
            }
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        age: {
            type: Number,
            required: true
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            minLength: [3, 'Username must be at least 3 characters'],
            maxLength: [20, 'Username cannot exceed 20 characters'],
            match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be at least 8 characters long'],
            select: false
        },
        phone_number: {
            type: String,
            required: [true, 'Phone number is required'],
            match: [/^(09|\+639)\d{9}$/, 'Please enter a valid Philippine mobile number (e.g., 09123456789 or +639123456789)']
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
)

// --- PASSWORD HASHING LOGIC ---
UserSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


const User = mongoose.model("User", UserSchema);
export default User;