const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chat', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    users_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'chat',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chat_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
