import BaseSchema from '../../components/BaseSchema';
import mongoose from 'mongoose';

const UserSchema = new BaseSchema({
  email: { type: String, required: true, unique: true, maxlength: 50 },
  name: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true, maxlength: 100 },
});

const User = mongoose.model('User', UserSchema);

export default User;

