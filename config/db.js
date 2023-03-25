var {createPool} = require('mysql');
var pool  = createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,//'localhost', 
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME
});
module.exports = pool;