const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    deleteThought,
    getThoughtById,
    updateThought,
    addReaction,
    removeReaction
  } = require('../../controllers/thought-controller');
// Set up GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// GET thought by id, PUT thought, DELETE thought /api/thoughts/:thoughtId/
router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//POST reaction /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

//DELETE reaction /api/thoughts/:thoughtId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);



module.exports = router;