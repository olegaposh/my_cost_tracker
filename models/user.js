
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );
  //models variable has all the trasactions 
  User.associate = (models) => {
    User.hasMany(models.transaction, {
      // if you delete the user, their transactions get deleted
      onDelete: "cascade"
    });
  };

  // generates a hash to conceal the password 
  User.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };
  // checks if an unhashed password entered matches the stored hashed password 
  User.validPassword = (inputPwd, dbPwd) => {
    return bcrypt.compareSync(inputPwd, dbPwd);
  };

  return User;
};