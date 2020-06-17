module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "transaction",
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      shop_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      }
    },
    {
      underscored: false,
      freezeTableName: true,
      timestamps: false
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Transaction;
};