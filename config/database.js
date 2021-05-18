const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'b543cfb67d9e94',
    password: '42735c7f',
    database: 'heroku_0be2bf74b1d2878'
});

pool.query = util.promisify(pool.query);
module.exports = pool;