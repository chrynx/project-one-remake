const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const User = require('../models/user');
const { dbURI } = require('../config/environment');// ==================================POSTS==============================================

const userData = [{
  charName: 'chrynx',
  charLevel: 1,
  charXP: 0,
  //---------character stats---------------
  str: 5,
  agi: 5,
  int: 5,
  hp: 100,
  mp: 100,
  //------------------------------------
  email: 'chrynx@battlr.com',
  password: 'password',
  passwordConfirmation: 'password'
} , {
  charName: 'SLiikzz',
  charLevel: 1,
  charXP: 0,
  //---------character stats---------------
  str: 5,
  agi: 5,
  int: 5,
  hp: 100,
  mp: 100,
  //------------------------------------
  email: 'sliikzz@battlr.com',
  password: 'password',
  passwordConfirmation: 'password'
}];

mongoose
  .connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => console.log(users.length + ' users created!'))
  .catch(err => console.log(err))
  .finally(() => {
    mongoose.connection.close();
  });
