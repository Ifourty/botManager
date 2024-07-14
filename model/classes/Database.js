const mysql = require('mysql2/promise');

class Database {
    constructor(config) {
        this.config = config;
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mysql.createConnection(this.config);
            console.log('Connected to the database.');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async query(sql, params) {
        if (!this.connection) {
            throw new Error('Not connected to the database.');
        }

        try {
            const [results,] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    async close() {
        if (this.connection) {
            try {
                await this.connection.end();
                console.log('Database connection closed.');
            } catch (error) {
                console.error('Error closing the connection:', error);
                throw error;
            }
        }
    }
}

const db = new Database({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});


module.exports = db;