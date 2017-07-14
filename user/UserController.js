var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var User = require('./User');

router.use(bodyParser.json())

// create a new User
router.post('/', function(req, res) {
  // console.log(req.body);      // your JSON
  User.create({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    infusionId : req.body.infusionId,
    titanId : req.body.titanId
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem adding the user to the database.");
    res.status(200).send(user);
  });
});

// gets a single user from the database
router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

// deletes a user from the database
router.delete('/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send(`User ${user.firstName} was deleted.`);
  });
});

// updates a single user in the database
router.put('/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send(user);
  });
});

// returns all the users in the database
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});

module.exports = router;
