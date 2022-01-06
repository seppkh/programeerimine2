/* eslint-disable max-len */
import mysql from 'mysql2';
import path from 'path';
import fs from 'fs';
import config from './config';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  // port: config.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  // connectTimeout: 3000,
}).promise();

pool.query(`USE ${config.db.database};`).catch(() => {
  console.log('Creating database');
  const sqlPath = path.join(__dirname, '../docs/modelAndSeed.sql');
  console.log(sqlPath);

  const SQL = fs.readFileSync(sqlPath, { encoding: 'utf-8' });
  console.log(SQL);

  pool.query(SQL).then(() => console.log('Database created and seeded')).catch((err) => console.log(err));
});

export default pool;
