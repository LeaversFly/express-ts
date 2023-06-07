import { IDBConfig } from "../types";
import Utils from "./Utils";

const mysql = require("mysql2");

const ENV = Utils.getInstance().getConfig<boolean>("env");
const config = Utils.getInstance().getConfig<object>("db_config") as object;
const dbConfig = config[`${ENV}`] as unknown as IDBConfig;

const pool = mysql.createPool(dbConfig);

const execute = (sql: string) => {
    return new Promise<any>((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error);
            } else {
                connection.query(sql, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    connection.release(); // 释放该链接，把该链接放回池里供其他人使用
                });
            }
        });
    });
}

export default execute;