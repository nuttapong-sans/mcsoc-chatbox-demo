var DataTypes = require("sequelize").DataTypes;
var _chat = require("./chat");
var _users = require("./users");

function initModels(sequelize) {
  var chat = _chat(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  chat.belongsTo(users, { as: "user", foreignKey: "users_id"});
  users.hasMany(chat, { as: "chats", foreignKey: "users_id"});

  return {
    chat,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
