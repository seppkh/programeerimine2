import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  },
};

export default config;

/*
const config = {
  jwtSecret: 'jwtsecret',
  db: {
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'schedule',
    port: 3306,
  },
};

export default config

*/
