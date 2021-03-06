const router = require("express").Router();

const Users = require("./users-model");
const Exercises = require("../exercises/exercises-model");
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
  Users.addExercise(newExercise)
    .then(item => {
      res.status(201).json(item);
    })
    .catch(err => {
      res.status(500).json({ message: "Error posting exercise" });
      console.log(err);
    });
});

//GET exercises for specific user
router.get("/:id/exercises", restricted, (req, res) => {
  const id = req.params.id;
  Exercises.userExercises(id)
  .then(exercises => {
    res.status(200).json(exercises)
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: "Error retrieving exercises."})
  })
});

// router.get("/:id/exercises", (req, res) => {
//   const id = req.params.id
//   Users.getExercises(id)
//     .then(users => {
//       res.status(200).json(users)
//     })
//     .catch(error => {
//       console.log(error)
//       res.status(500).json({ message: "Error retrieving specific user exercises" })
//     })
// });


module.exports = router;