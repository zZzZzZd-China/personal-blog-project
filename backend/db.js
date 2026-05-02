import mysql from "mysql2";

// 尝试从环境变量获取连接配置
let poolConfig = {};

if (process.env.MYSQL_URL || process.env.DATABASE_URL) {
  // Railway 通常会提供完整的连接字符串
  const connectionUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
  poolConfig = { uri: connectionUrl };
} else {
  // 本地开发环境
  poolConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "@zhangdi666",
    database: process.env.DB_NAME || "001_schema",
    port: process.env.DB_PORT || 3306,
  };
}

const db = mysql.createPool(poolConfig);

export default db;
