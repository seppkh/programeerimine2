/* eslint-disable max-len */
import mysql from 'mysql2';
// import path from 'path';
// import fs from 'fs';
import config from './config';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
  connectTimeout: 3000,
}).promise();

/*
pool.query(`USE ${config.db.database};`).catch(async () => {
  console.log('Creating database');
  const sqlPath = await path.join(__dirname, '../docs/modelAndSeed.sql');
  const SQL = await fs.readFileSync(sqlPath, { encoding: 'utf-8' });
  await pool.query(SQL).then(async () => console.log('Database created and seeded')).catch(async (err) => console.log(err));
});
*/

export default pool;
