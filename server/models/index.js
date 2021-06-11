const { Sequelize } = require("sequelize");
require("dotenv").config();
const POSTGRES_CRED = process.env.POSTGRES_CRED;

const sequelize = new Sequelize(POSTGRES_CRED);

module.exports = sequelize;
