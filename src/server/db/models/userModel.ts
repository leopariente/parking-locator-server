import { Schema, model } from 'mongoose';
const bcrypt = require('bcryptjs');

// Number of salts to the password
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  preferences: JSON,
});

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err: any, salt: any) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err: any, hash: any) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Function that gets a hashed password and an unhashed passwored. Returns true if it is the correct password
UserSchema.methods.comparePassword = function (
  candidatePassword: any,
  cb: any
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    function (err: any, isMatch: any) {
      if (err) return cb(err);
      cb(null, isMatch);
    }
  );
};

export const UserModel = model('User', UserSchema);
