const { username, password, name } = require('../config/keys.config');

const dbUsername = username;
const dbPassword = password;
const dbName = name;

const connectionString = 'postgres://vyonsoxqbpdggv:361bd476804ba452c9fbf6f3262d38bfaa7c366c4c7038ca44ba6756239b6eaa@ec2-52-6-143-153.compute-1.amazonaws.com:5432/daov8bmn2kniuj?ssl=true';

module.exports = connectionString;