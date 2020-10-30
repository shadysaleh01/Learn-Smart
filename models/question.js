// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
   const Questions = sequelize.define("Questions", {
      // Category cannot be null
      category: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // Question cannot be null
      question: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // The answer cannot be null 
      answer: {
         type: DataTypes.STRING,
         allowNull: false,
      }
   }, {
      timestamps: false
   });
   return Questions;
}
