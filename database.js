const mysql = require("mysql2/promise");

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "task_app",
      });
      Database.instance = this;
    }
  }

  async getConnection() {
    try {
      return await this.pool.getConnection();
    } catch (error) {
      console.log("Error while getting connection" + error);
      throw error;
    }
  }
}

module.exports = new Database();
