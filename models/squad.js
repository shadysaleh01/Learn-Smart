// Creating the Squad model
module.exports = function(sequelize, DataTypes) {
  const Squad = sequelize.define("Squad", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The email cannot be null, and must be a proper email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // The default score is zero
    score: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    squad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Squad;
};
