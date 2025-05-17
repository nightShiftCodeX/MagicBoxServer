import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    device_id: String,
    created_at: String,
    updated_at: String,
});

const User = mongoose.model('User', userSchema);

export default User;
