// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the play page
    // if (req.user) {
    //   res.redirect("/play");
    // }
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the play page
    if (req.user) {
      res.redirect("/play");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the play page
    if (req.user) {
      res.redirect("/play");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/highscore", (req, res) => {
    // If the user already has an account send them to the play page
    if (req.user) {
      res.redirect("/highscore");
    }
    res.sendFile(path.join(__dirname, "../public/highscore.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/play", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/play.html"));
  });
};
