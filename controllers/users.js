const User = require('../models/user'); // requiring the user model for use here

function usersIndex(req, res, next) { // usersIndex function to get all users from the DB
  User // stating we are using the user model
    .find() // find method to find all the users
    .exec() // give back all the results
    .then(users => res.json(users)) // AFTER the users has been gathered, hand over to the front end in JSON form
    .catch(next); // catch any errors and send it to our errorHandler
}
function usersShow(req, res, next) { // a usersShow funciton to get a specific user using the passed ID
  User //using the User model
    .findById(req.params.id) // find a specific user using the ID
    .exec() // give back the user data
    .then(user => res.json(user)) // send back data in JSON form
    .catch(next); // catch any errors
}

function usersUpdate (req, res, next) { // a usersUpdate function to handle updates to a user
  if(req.file) req.body.image = req.file.filename; // to handle image uploading
  User // using the User model
    .findById(req.params.id) // gather a specific user with the ID
    .exec() // give back the user data
    .then(user => { // AFTER finding the user
      user = Object.assign(user, req.body); // replacing the user data with the data from the form in the front end
      user.save(); // save the user in the database
      res.send(user); // send back the user data
    })
    .catch(next); // catch any errors
}
function usersDelete(req,res,next) { // a usersDelete function to delete a specific user
  User // use the User model
    .findById(req.params.id) // find a specific user
    .exec() // give the data back
    .then(user => user.remove()) // AFTER finding the user, remove it from the database
    .then(() => res.sendStatus(204)) // send a 204 status after deleting it
    .catch(next); // catch any errors
}


module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
