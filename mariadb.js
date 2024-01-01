// mysql 모듈 소환
const mariadb = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

// DB와 연결 통로 생성
const connection = mariadb.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'Bookstore',
    dateStrings: true,
});

module.exports = connection;
