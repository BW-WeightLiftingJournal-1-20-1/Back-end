const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secrets");

const Users = require("../users/users-model");

//ENDPOINTS WITH /api/auth

//Register a new user
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      const token = signToken(user)
      res.status(201).json({token: token, message: saved })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Error registering new user."})
    })
});

//Logging In
router.post("/login", (req, res) => {
  let {username, password} = req.body;
  Users.findBy({username})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)){
      const token = signToken(user)
      res.status(200).json({
        message: `Welcome back ${user.username}`,
        id: user.id,
        token
      })
    } else {
      res.status(401).json({message: "Invalid Credentials."})
    }
  })
});

function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, jwtSecret, options)
};

module.exports = router;