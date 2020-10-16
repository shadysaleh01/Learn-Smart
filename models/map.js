// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our MAPS model
module.exports = function (sequelize, DataTypes) {
    const Maps = sequelize.define("Maps", {
        //squad cannot be null
        squad: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "white"
        },
        // claim name cannot be null
        userInits: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Enter Inits",
        },
        // user score cannot be null
        userScore: {
            type: DataTypes.INT,
            allowNull: false,
            defaultValue: 0,
        }
    })
    return Maps;
}