import mysql from 'mysql';
import { Plant } from '../components/products/plants/plant'
import { Algeae } from '../components/products/plants/algeae'
import { Flower } from '../components/products/plants/flower'
import { Tree } from '../components/products/plants/tree'
import { GoatFertilizer } from '../components/products/fertilizers/goatFertilizer'
import { SheepFertilizer } from '../components/products/fertilizers/sheepFertilizer'
import { Product } from '../components/products/product'
import { Fertilizer } from '../components/products/fertilizers/fertilizer';

export class Database {
    private connection : mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '<PASSWORD>'
        });
        this.connection.connect((err: Error) => {
            if (err) throw err;
            console.log('connected as id' + this.connection.threadId);
            this.createDatabase();
        });
    }

    createDatabase() {
        this.connection.query('CREATE DATABASE IF NOT EXISTS products_db', (err : Error) => {
            if (err) throw err;
            console.log('Database created or already exists.');
            this.connection.changeUser({database: 'products_db'}, (err: Error) => {
                if (err) throw err;
                this.createTables();
            });
        });
    }

    createTables() {
        const productsTable = `
            CREATE TABLE IF NOT EXISTS products (
                code VARCHAR(255) NOT NULL,
                name VARCHAR(255),
                type VARCHAR(255),
                color VARCHAR(255),
                weight DECIMAL(10, 2),
                amount INT,
                PRIMARY KEY (code)
            )
        `;

        this.connection.query(productsTable, (err, results, fields) => {
            if (err) throw err;
            console.log('Tables created or already exist.');
        });
    }

    private constructProductSQL(element : Product): string[] | undefined {
        if (element instanceof Plant) {
            const type = element instanceof Tree ? 'tree' :
                element instanceof Algeae ? 'algeae' :
                element instanceof Flower ? 'flower' : '';
            return [element.getCode.toString(), 'plant', type, element.getColor.toString(), '', element.getAmount.toString()];
        } else if(element instanceof Fertilizer) {
            const type = element instanceof GoatFertilizer ? 'goatFertilizer' :
                element instanceof SheepFertilizer ? 'sheepFertilizer' : '';
                
            return [element.getCode.toString(), 'fertilizer', type, '', element.getweight.toString(), element.getAmount.toString()];
        } 
    }

    addProduct(element: Product) {
        const sqlString = this.constructProductSQL(element);
        if(sqlString === undefined){
            return 'Error';
        }
        const db = "INSERT INTO products (code, name, type, color, weight, amount) VALUES (?, ?, ?, ?, ?, ?)";
        this.connection.query(db, sqlString, (err) => {
            if (err) throw err;
            console.log(`Added product: ${sqlString[1]} with type: ${sqlString[2]} with color:
             ${sqlString[3]} with weight: ${sqlString[4]} and the amount ${sqlString[5]}`);
        });
    }

    updateProductWeight(productCode: number, weight: number){
      let updateQuery = 'UPDATE * SET weight = ? WHERE code = ?';
      
      const updateValues = [weight  +'', productCode + ''];
      
      this.executeQuery(updateQuery, updateValues, `Updated ${productCode} with weight ${weight}`  );

       
    }

    
    updateProductAmount(productCode: number, newAmount: number){
        const updateQuery = 'UPDATE * SET amount = ? where code = ?'
        const updateValues = [newAmount + '', productCode + '']
        this.executeQuery(updateQuery, updateValues, `Updated ${productCode} with amount ${newAmount}`  );

    }


    private executeQuery(query: string, param: string[], successMsg: string) {
        this.connection.query(query, param, (err, results) => {
            if (err) throw err;
            if (results === null) return 'Found Nothing';
            console.log(successMsg);
            for (const res in results) console.log(res);
        });
    }

    removeProductByCode(productCode : string) {
        this.executeQuery("DELETE FROM products WHERE code = ?", [productCode], `Removed product with code: ${productCode}`);
    }

    searchProductByCode(productCode :string) {
        this.executeQuery("SELECT * FROM products WHERE code = ?", [productCode], `Found product with code: ${productCode}`);
    }

    filterProductByName(productName : string) {
        this.executeQuery("SELECT * FROM products WHERE name = ?", [productName], `Found product(s) with name: ${productName}`);
    }

    filterProductByType(productType :string) {
        this.executeQuery("SELECT * FROM products WHERE type = ?", [productType], `Found product(s) with type: ${productType}`);
    }

    filterProductByColor(productColor : number) {
        this.executeQuery("SELECT * FROM products WHERE color = ?", [productColor.toString()], `Found product(s) with color: ${productColor}`);
    }

    filterProductByWeight(productWeight : number) {
        this.executeQuery("SELECT * FROM products WHERE weight = ?", [productWeight.toString()], `Found product(s) with weight: ${productWeight}`);
    }

}
