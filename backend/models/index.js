const Project = require("./Project")
const Client = require("./Client")
const Contact = require("./Contact")
const Subscriber = require("./Subscriber")

// Define associations here if needed
// Example: Project.belongsTo(User, { foreignKey: 'created_by' });

module.exports = {
  Project,
  Client,
  Contact,
  Subscriber,
}
