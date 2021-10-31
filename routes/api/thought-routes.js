const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReply,
  removeReply
} = require('../../controllers/Thought-controller');

// /api/Thoughts/<pizzaId>
router.route('/:pizzaId').post(addThought);

// /api/Thoughts/<pizzaId>/<ThoughtId>
router
  .route('/:pizzaId/:ThoughtId')
  .put(addReply)
  .delete(removeThought);

// /api/Thoughts/<pizzaId>/<ThoughtId>/<replyId>
router.route('/:userId/:ThoughtId/:replyId').delete(removeReply);

module.exports = router;