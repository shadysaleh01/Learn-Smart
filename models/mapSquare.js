// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
   const MapSquare = sequelize.define("MapSquare", {
      // current color 
      color: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // inits user
      inits: {
         type: DataTypes.STRING,
         allowNull: false,
      }

   }, {
      timestamps: false
   });
   return MapSquare;
}
