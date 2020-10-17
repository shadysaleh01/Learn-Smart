// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const Sequelize = require("sequelize")

module.exports = function (app) {

  //////////////////////// Login  //////////////////////////
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
  ////////////////////////////////////////////////////////////////////////
  //////////////////////////// Users table //////////////////////////////
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

  // PUT route for updating squad
  app.put("/api/img", (req, res) => {
    db.User.update({
      img: req.body.img
    }, {
      where: {
        email: req.body.email
      }
    }).then((data) => {
      console.log(data)
      res.json(data);
    })
      .catch((err) => {
        res.json(err);
      });
  })

  // // PUT route for updating score
  // app.put("/api/score", (req, res) => {
  //   db.User.update({
  //     score: req.body.score
  //   }, {
  //     where: {
  //       email: req.body.email
  //     }
  //   }).then((data) => {
  //     res.json(data);
  //   })
  //     .catch((err) => {
  //       // Whenever a validation or flag fails, an error is thrown
  //       // We can "catch" the error to prevent it from being "thrown", which could crash our node app
  //       res.json(err);
  //     });
  // })
  ///////////////////////////////////////////////////////////////////////////
  ///////////////////////////// Category ///////////////////////////////////
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
  //////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// Maps ////////////////////////////////////
  //// GET route to  find all maps data ////
  app.get("/api/maps", (req, res) => {
    db.Maps.findAll({}).then((data) => {
      res.json(data)
    })
  })

  //// Post route to create data in maps table/////
  app.post("/api/maps", (req, res) => {
    db.Maps.create({
      email: req.body.email,
      squad: req.body.squad,
      inits: req.body.inits,
      score: req.body.score,
      category: req.body.category
    }).then((data) => {
      res.json(data);
    })

  });
  // PUT route for updating map table
  // app.put("/api/maps", (req, res) => {
  //   db.Maps.update({
  //     email: req.body.email,
  //     squad: req.body.squad,
  //     inits: req.body.inits,
  //     score: req.body.score,
  //     category: req.body.category
  //   }, {
  //     where: {
  //       id: req.body.id
  //     }
  //   }).then((data) => {
  //     res.json(data);
  //   })
  //     .catch((err) => {
  //       // Whenever a validation or flag fails, an error is thrown
  //       // We can "catch" the error to prevent it from being "thrown", which could crash our node app
  //       res.json(err);
  //     });
  // })
  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////Map Square /////////////////////////

  // PUT route for updating map square table
  app.put("/api/mapsquare/:id", (req, res) => {
    db.MapSquare.update({
      color: req.body.color,
      inits: req.body.inits
    }, {
      where: {
        id: req.params.id
      }
    }).then((data) => {
      res.json(data);
    })
      .catch((err) => {
        res.json(err);
      });
  })

  //// GET route to get all data from map square////
  app.get("/api/mapsquare", (req, res) => {
    db.MapSquare.findAll({}).then((data) => {
      res.json(data)
    })
  })

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });




  app.get("/api/joinUsersMaps", (req, res) => {

    db.sequelize.query('SELECT User.firstName, User.lastname, User.img, Maps.category, Maps.squad, Maps.score FROM User JOIN Maps on Maps.email = User.email ORDER BY score DESC;', { nest: true }).then((data) => {
      // console.log(data)
      res.json(data)
    });

  })

  // Raw query - use array destructuring

  // Model1.belongsTo(Model2, { as: 'alias' })

  // Model1.findAll({ include: [{ model: Model2, as: 'alias' }] }, { raw: true }).success(onSuccess).error(onError);

};
