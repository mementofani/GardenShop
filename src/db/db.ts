//Create a database for the products.
//

import mysql from 'mysql';
import {Plant} from '../components/products/plants/plant'
import {Algeae} from '../components/products/plants/algeae'
import {Flower} from '../components/products/plants/flower'
import {Tree} from '../components/products/plants/tree'
import {GoatFertilizer} from '../components/products/fertilizers/goatFertilizer'
import {SheepFertilizer} from '../components/products/fertilizers/sheepFertilizer'


export class Database {

private connection;

constructor(){
        this.connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '<PASSWORD>',
        database: 'products_db'
    }); 
    this.connection.connect((err) => {
        if (err) throw err;
        console.log('connected as id'+ this.connection.threadId);
    });
};


addProduct(element) {
    
    let sqlString: String[];
    if (element instanceof Plant) {
        sqlString = [element.getCode.toString(), 'plant', '', element.getColor.toString(), ''];
        if (element instanceof Tree) {
            sqlString[2] = 'tree';
        } else if (element instanceof Algeae) {
            sqlString[2] = 'algeae';
        } else if (element instanceof Flower) {
            sqlString[2] = 'flower';
        }
    }
     else{ 
         sqlString = [element.getCode.toString(),'fertilizer', '', '',element.weight.toString()]
        if(element instanceof GoatFertilizer){
            sqlString[2] =  'goatFertilizer'

    } else if(element instanceof SheepFertilizer){
            sqlString[2] = 'sheepFertilizer'
    }}
    
    const db = "INSERT INTO products (name, type, color, weight) VALUES (?, ?, ?, ?, ?)";

    this.connection.query(db, [sqlString[0], sqlString[1],sqlString[2],sqlString[3],sqlString[4]], (err, results) => {
        if (err) throw err;
        console.log(`Added product: ${sqlString[1]} with type: ${sqlString[2]} with color: ${sqlString[3]} with weight: ${sqlString[4]}`);
    });
}

removeProductByCode(productCode) {
    const db = "DELETE FROM products WHERE code = ?";
    this.connection.query(db, [productCode], (err, results) => {
        if (err) throw err;
        console.log(`Removed product with code: ${productCode}`);
    });
}

}