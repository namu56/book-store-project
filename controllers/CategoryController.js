const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

const getAllCategory = (req, res) => {
    // 카테고리 전체 목록 리스트
    let sql = 'SELECT * FROM category';
    conn.query(sql, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = getAllCategory;
