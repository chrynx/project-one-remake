const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  //-----character properties-----------
  charName: { type: String, unique: 'Character name has already been taken', required: 'Please name your character' },
  charLevel: Number,
  charXP: Number,
  //---------character stats---------------
  str: { type: Number, required: 'Strength is required'},
  agi: { type: Number, required: 'Agility is required'},
  int: { type: Number, required: 'Intelligence is required'},
  hp: { type: Number, required: 'HP is required'},
  mp: { type: Number, required: 'MP is required'},
  //------------------------------------
  email: { type: String, unique: 'Email has already been taken', required: 'An e-mail address is required' },
  password: { type: String, required: 'A password is required' }
});
userSchema
  .virtual('passwordConfirmation')
  .set(function setPassWordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPasswordConfirmation(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password)
    this.invalidate('passwordConfirmation', 'Your passwords do not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};
// -----------------------------------------

module.exports = mongoose.model('User', userSchema);
