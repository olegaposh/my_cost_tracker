module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
      "transaction",
      {
        date: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        ShopName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
        //   location: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        //   }
      },
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