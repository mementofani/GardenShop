import mysql from 'mysql';
import { Plant } from '../components/products/plants/plant'
import { Algeae } from '../components/products/plants/algeae'
import { Flower } from '../components/products/plants/flower'
import { Tree } from '../components/products/plants/tree'
import { GoatFertilizer } from '../components/products/fertilizers/goatFertilizer'
import { SheepFertilizer } from '../components/products/fertilizers/sheepFertilizer'

export class Database {
    private connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '<PASSWORD>',
            database: 'products_db'
        });
        this.connection.connect((err) => {
            if (err) throw err;
            console.log('connected as id' + this.connection.threadId);
        });
    }

    private constructProductSQL(element): string[] {
        if (element instanceof Plant) {
            const type = element instanceof Tree ? 'tree' :
                element instanceof Algeae ? 'algeae' :
                element instanceof Flower ? 'flower' : '';
            return [element.getCode.toString(), 'plant', type, element.getColor.toString(), ''];
        } else {
            const type = element instanceof GoatFertilizer ? 'goatFertilizer' :
                element instanceof SheepFertilizer ? 'sheepFertilizer' : '';
            return [element.getCode.toString(), 'fertilizer', type, '', element.weight.toString()];
        }
    }

    addProduct(element) {
        const sqlString = this.constructProductSQL(element);
        const db = "INSERT INTO products (code, name, type, color, weight) VALUES (?, ?, ?, ?, ?)";
        this.connection.query(db, sqlString, (err) => {
            if (err) throw err;
            console.log(`Added product: ${sqlString[1]} with type: ${sqlString[2]} with color: ${sqlString[3]} with weight: ${sqlString[4]}`);
        });
    }

    private executeQuery(query: string, param: string, successMsg: string) {
        this.connection.query(query, [param], (err, results) => {
            if (err) throw err;
            if (results === null) return 'Found Nothing';
            console.log(successMsg);
            for (const res in results) console.log(res);
        });
    }

    removeProductByCode(productCode) {
        this.executeQuery("DELETE FROM products WHERE code = ?", productCode, `Removed product with code: ${productCode}`);
    }

    searchProductByCode(productCode) {
        this.executeQuery("SELECT * FROM products WHERE code = ?", productCode, `Found product with code: ${productCode}`);
    }

    filterProductByName(productName) {
        this.executeQuery("SELECT * FROM products WHERE name = ?", productName, `Found product(s) with name: ${productName}`);
    }

    filterProductByType(productType) {
        this.executeQuery("SELECT * FROM products WHERE type = ?", productType, `Found product(s) with type: ${productType}`);
    }

    filterProductByColor(productColor) {
        this.executeQuery("SELECT * FROM products WHERE color = ?", productColor, `Found product(s) with color: ${productColor}`);
    }

    filterProductByWeight(productWeight) {
        this.executeQuery("SELECT * FROM products WHERE weight = ?", productWeight, `Found product(s) with weight: ${productWeight}`);
    }
}
