import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
      phoneNumber: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    console.log('Hashed Password:', hashedPassword);  
    this.password = hashedPassword;
    next();
});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const userModel = mongoose.model('User', userSchema);

export default userModel;
