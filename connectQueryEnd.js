const mariadb = require('mariadb');

let pool;
if (process.env.NODE_ENV === 'production') {
  pool = mariadb.createPool({
    host: 'grandcentral.db',
    user: 'about_others',
    password: '8672E28DF16BF487A',
    connectionLimit: 5
  });
} else {
  pool = mariadb.createPool({
    host: 'localhost',
    user: 'grand_central',
    connectionLimit: 5
  });
}

module.exports = sql => {
  return pool.getConnection().then(connection => {
    return connection
      .query(sql)
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        connection.end();
      });
  });
};
