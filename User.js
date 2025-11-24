import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    deviceId: String,
    created_at: String,
    updated_at: String,
});

const User = mongoose.model('User', userSchema);

export default User;
