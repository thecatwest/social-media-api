const { Thought, User } = require('../models');

const thoughtController = {
     //get all available thoughts
     getAllThoughts(req, res) {
          Thought.find({})
          .select('-__v')
          .then(ThoughtsDb => res.json(ThoughtsDb))
          .catch(err => {
               console.log(err);
               res.sendStatus(400);
          });
     },

     //get an individual thought by id
     getOneThought({ params }, res) {
        Thought.findOne({_id: params.id})
        .then(ThoughtsDb => {
               if(!ThoughtsDb) {
                return res.status(404).json( {message: "No user with that ID exists. Try again." } );
               }
               res.json(ThoughtsDb);
          })
          .catch(err => res.json(err));
     },

     // create (post) a new thought -> push its id to user's thoughts field
     createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            );
        })
        .then(UsersDb => {
            if (!UsersDb) {
                return res.status(404).json({ message: "No user with that ID exists. Try again." })
            }
            res.json(UsersDb);
        })
        .catch(err => res.json(err));
    },

     // update (put) a thought by id
     updateThought({ params, body }, res) {
          Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(ThoughtsDb => {
               if (!ThoughtsDb) {
                   return res.status(404).json({ message: "No thought with that ID exists. Try again." });
               }
               res.json(ThoughtsDb);
          })
          .catch(err => res.json(err));
     },

     //delete a thought by id
     deleteThought({ params }, res) {
          Thought.findOneAndDelete({ _id: params.id })
          .then(ThoughtsDb => res.json(ThoughtsDb))
          .catch(err => res.json(err));
     },

     //create (post) a new reaction
     createReaction({ params, body }, res) {
          Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body} }, { new: true, runValidators: true })
          .then(ReactionsDb => {
               if (!ReactionsDb) {
                    return res.status(404).json({ message: "No user with that ID exists. Try again." });
               }
               res.json(ReactionsDb);
          })
          .catch(err => res.json(err));
     },

     //delete an individual reaction
     deleteReaction({ params, body }, res) {
          console.log('params', params.thoughtId);
          console.log('body', body.reactionId);
          Thought.findOneAndUpdate(
               { _id: params.thoughtId },
               { $pull: { reactions: { reactionId: body.reactionId } } },
               { new: true }
          )
          .then(ThoughtsDb => res.json(ThoughtsDb))
          .catch(err => {
               console.log(err);
               res.json(err);
          });
     }
};

module.exports = thoughtController;