// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our MAPS model
module.exports = function(sequelize, DataTypes) {
  const Maps = sequelize.define("Maps", {
//squad cannot be null
    squad: {
        type: DataTypes.STRING,
        allowNull: false,

    },
// claim name cannot be null
    claimName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
// user score cannot be null
    claimUserScore: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
