import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

import BaseSchema from '../../components/BaseSchema';

const UserSchema = new BaseSchema({
  email: { type: String, required: true, unique: true, maxlength: 50 },
  name: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true, maxlength: 100 },
});

UserSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SIGNATURE || 'test');
};

const User = mongoose.model('User', UserSchema);

export default User;

