const { User, Thought } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
     // get thought by id
    getThoughtById({params}, res){
        Thought.findOne({_id:params.thoughtId})
        .then(dbThoughtData => {
            if(!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

       // add new thought
       createThought({body}, res) {
        Thought.create(body)
          .then((dbThoughtData) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'Thought created but there is no user with this id!' });
            }
    
            res.json({ message: 'Thought successfully created!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      
    //update thought
    updateThought ({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData){
                res.status(404).json({message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch (err => {
            res.status(400).json(err);
        });
    },

    //delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if(!dbThoughtData){
              res.status(404).json({ message: 'No thought found with this id!' });
          }
            res.json(dbThoughtData)})
            .catch(err => res.status(400).json(err))
     },

     //add reaction
     addReaction({params, body}, res){
         Thought.findOneAndUpdate(
             {_id: params.thoughtId},
             {$push: {reactions: body}},
             {new: true, runValidators: true}
         )
         .then(dbUserData => {
             if (!dbUserData){
                 res.status(404).json({message:'No user found with this id!'});
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.status(500).json(err))

     },

     //remove reaction
     removeReaction({params}, res){
         Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
         )
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
     }

};

module.exports = thoughtController;