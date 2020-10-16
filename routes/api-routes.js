// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Get route for returning a all users
  app.get("/api/users", (req, res) => {
    db.User.findAll({}).then((data) => {
      res.json(data)
    })
  })

  // Get route for returning a single user
  app.get("/api/user/:email", (req, res) => {
    db.User.findOne({
      where: {
        email: req.params.email
      }
    }).then((data) => {
      res.json(data)
    })
  })

  // PUT route for updating squad
  app.put("/api/squad", (req, res) => {
    db.User.update({
      squad: req.body.squad
    }, {
      where: {
        email: req.body.email
      }
    }).then((data) => {
      console.log(data)
      res.json(data);
    })
      .catch((err) => {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  })

  // PUT route for updating score
  app.put("/api/score", (req, res) => {
    db.User.update({
      score: req.body.score
    }, {
      where: {
        email: req.body.email
      }
    }).then((data) => {
      res.json(data);
    })
      .catch((err) => {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  })

  // Get route for returning questoins of a specific category
  app.get("/api/questions/category/:category", (req, res) => {
    db.Questions.findAll({
      where: {
        category: req.params.category
      }
    })
      .then((data) => {
        res.json(data);
      });
  });

  // PUT route for updating map table
  app.put("/api/maps", (req, res) => {
    db.Maps.update({
      squad: req.body.squad,
      userInits: req.body.userInits,
      userScore: req.body.userScore
    }, {
      where: {
        id: req.body.id
      }
    }).then((data) => {
      res.json(data);
    })
      .catch((err) => {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  })

  //// GET route to  find all maps data ////
  app.get("/api/maps", (req, res) => {
    db.Maps.findAll({}).then((data) => {
      res.json(data)
    })
  })

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


};

