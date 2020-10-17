// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
// Creating our MAPS model
module.exports = function (sequelize, DataTypes) {
    const Maps = sequelize.define("Maps", {
        //squad cannot be null
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        squad: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "white"
        },
        // claim name cannot be null
        inits: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Enter Inits"
        },
        // user score cannot be null
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    })

    return Maps;
}