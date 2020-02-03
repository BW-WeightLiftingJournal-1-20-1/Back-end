const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/authenticate-middleware");

// GET all users
router.get("/", restricted, (req, res) => {
  Users.getAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Error retrieving users." })
    })
});

//POST new exercise
router.post("/:id/exercises", restricted, (req, res) => {
  let newExercise = req.body;
  newExercise.user_id = req.params.id
  console.log(newExercise);
  Users.addExercise(newExercise)
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.status(500).json({ message: "Error posting exercise" });
      console.log(err);
    });
});


module.exports = router;