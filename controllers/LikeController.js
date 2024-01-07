const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { handleQueryError } = require('../utils/ErrorHandler');

const addLike = (req, res) => {
    // 좋아요 추가
    const { book_id } = req.params;
    const { user_id } = req.body;

    let sql = 'INSERT INTO likes (user_id, book_id) VALUES (?, ?)';
    let values = [user_id, book_id];
    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

const removeLike = (req, res) => {
    // 좋아요 취소
    const { book_id } = req.params;
    const { user_id } = req.body;

    let sql = 'DELETE FROM likes WHERE user_id = ? AND book_id = ?';
    let values = [user_id, book_id];
    conn.query(sql, values, (err, results) => {
        if (err) return handleQueryError(err, res);

        return res.status(StatusCodes.OK).json(results);
    });
};

module.exports = { addLike, removeLike };
