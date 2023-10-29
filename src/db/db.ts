//Create a database for the products.
//

import mysql from 'mysql';
import {Plant} from '../components/products/plants/plant'
import {Algeae} from '../components/products/plants/algeae'
import {Flower} from '../components/products/plants/flower'
import {Tree} from '../components/products/plants/tree'
import {GoatFertilizer} from '../components/products/fertilizers/goatFertilizer'
import {SheepFertilizer} from '../components/products/fertilizers/sheepFertilizer'

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '<PASSWORD>',
    database: 'products_db'
});



function addProduct(element) {
    
    let sqlString: String[];
    if(element instanceof Plant){

    sqlString = ['plant', '',element.getColor +'',''];
    if(element instanceof Tree){
      sqlString[1] = 'tree';

    } else if(element instanceof Algeae){

        sqlString[1] = 'algeae'
    } else if(element instanceof Flower){
        sqlString[1] = 'flower'
    } 
    }
     else{ 
         sqlString = ['fertilizer', '', '',element.weight]
        if(element instanceof GoatFertilizer){
            sqlString[1] =  'goatFertilizer'

    } else if(element instanceof SheepFertilizer){
            sqlString[1] = 'sheepFertilizer'
    }}
    
    const query = "INSERT INTO products (name, type, color, weight) VALUES (?, ?)";
    connection.query(query, [sqlString[0], sqlString[1],sqlString[2],sqlString[3]], (err, results) => {
        if (err) throw err;
        console.log(`Added product: ${sqlString[0]} with type: ${sqlString[1]} with color: ${sqlString[2]} with weight: ${sqlString[3]}`);
    });
}

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id'+ connection.threadId);
});



