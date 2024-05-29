const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function validateEmail(value) {
  const exp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  return exp.test(value);
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    validate: [validateEmail, 'You must enter a valid email address'],
    required: true
  },
  password: {
    type: String,
    minLength: [6, 'Your password must be at least 6 characters in length'],
    required: true
  },
  itemsForSale: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
  itemsWon: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

// Remove password from the returned user object
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Validate password
userSchema.methods.validatePass = async function (formPassword) {
  return await compare(formPassword, this.password);
};

// Generate JWT
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const User = model('User', userSchema);

module.exports = User;