const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const getAllBooks = (req, res) => {
    let { category_id, news, limit, currentPage } = req.query;

    // limit : page 당 도서 수 ex. 3
    // currentPage :   현재 페이지 ex. 1, 2, 3 ...
    // offset :                      0, 3, 6, 9, 12 ...
    //                               limit * (currentPage - 1)
    let offset = limit * (currentPage - 1);

    let sql = 'SELECT * FROM books';
    let values = [];

    if (category_id && news) {
        sql = sql += ' WHERE category_id = ? AND published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
        values = [category_id];
    } else if (category_id) {
        sql = sql += ' WHERE category_id = ?';
        values = [category_id];
    } else if (news) {
        sql = sql += ' WHERE published_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()';
    }

    sql += ' LIMIT ? OFFSET ?';
    values.push(parseInt(limit), offset);
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results.length) {
            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

const getBookDetail = (req, res) => {
    let { id } = req.params;

    let sql = 'SELECT * FROM books LEFT JOIN category ON books.category_id = category.id WHERE books.id = ?;';
    conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results[0]) {
            return res.status(StatusCodes.OK).json(results[0]);
        } else {
            return res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

module.exports = { getAllBooks, getBookDetail };
