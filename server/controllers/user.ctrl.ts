import * as User from "../models/User";
import * as Article from "../models/Article";

module.exports = {
  addUser: (req, res, next) => {
    new User(req.body).save((err, newUser) => {
      if (err) {
        res.send(err);
      } else if (!newUser) {
        res.send(400);
      } else {
        res.send(newUser);
      }
      next();
    });
  },

  getUser: (req, res, next) => {
    User.findById(req.params.id).then((err, user) => {
      if (err) {
        res.send(err);
      } else if (!user) {
        res.send(404);
      } else {
        res.send(user);
      }
      next();
    });
  },

  followUser: (req, res, next) => {
      User.findById(req.body.id) => {
          return user.follow(req.body.user_id).then(() => {
              return res.json({msg: "followed"})
          }).catch(next)
      }
  },

  getUserProfile: (req, res, next) => {
      User.findById(req.params.id).then(_user => {
          return User.find({'following': req.params.id}).then((_users) => {
              _user.forEach(user_ => {
                _user.addFollower(user_)
              });
          }).catch(err => console.log(err))
      })
  }
};
