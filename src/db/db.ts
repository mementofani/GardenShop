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

    sqlString = [element.getCode +'','plant', '',element.getColor +'',''];
    if(element instanceof Tree){
      sqlString[2] = 'tree';

    } else if(element instanceof Algeae){

        sqlString[2] = 'algeae'
    } else if(element instanceof Flower){
        sqlString[2] = 'flower'
    } 
    }
     else{ 
         sqlString = [element.getCode+'','fertilizer', '', '',element.weight]
        if(element instanceof GoatFertilizer){
            sqlString[2] =  'goatFertilizer'

    } else if(element instanceof SheepFertilizer){
            sqlString[2] = 'sheepFertilizer'
    }}
    
    const query = "INSERT INTO products (name, type, color, weight) VALUES (?, ?)";
    connection.query(query, [sqlString[0], sqlString[1],sqlString[2],sqlString[3],sqlString[4]], (err, results) => {
        if (err) throw err;
        console.log(`Added product: ${sqlString[1]} with type: ${sqlString[2]} with color: ${sqlString[3]} with weight: ${sqlString[4]}`);
    });
}

connection.connect((err) => {
    if (err) throw err;
    console.log('connected as id'+ connection.threadId);
});



