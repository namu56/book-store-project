const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');

const join = (req, res) => {
    const { email, password } = req.body;
    let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    let values = [email, password];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.CREATED).json({
            message: '회원 가입 성공',
        });
    });
};

module.exports = join;
