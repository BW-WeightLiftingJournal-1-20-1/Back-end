const router = require("express").Router();

const Exercises = require("./exercises-model");
const restricted = require("../auth/authenticate-middleware");

router.get("/", (req, res) => {
  Exercises.getAll()
    .then(exercises => {
      res.status(200).json(exercises);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving exercises." });
    });
});

// GET exercies by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Exercises.getById(id)
    .then(exercises => {
      res.status(200).json(exercises);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving exercises." });
    });
});

// UPDATE exercises by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Exercises.findById(id)
    .then(exercise => {
      if (exercise) {
        Exercises.update(changes, id).then(updatedExercise => {
          res.json(updatedExercise);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find exercise with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update exercise" });
    });
});

// DELETE exercises by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Exercises.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find exercise with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete exercise" });
    });
});

module.exports = router;