//Create a database for the products.
//

import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '<PASSWORD>',
    database: 'products_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id'+ connection.threadId);
});
