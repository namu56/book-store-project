const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); // jwt 모듈
const bcrypt = require('bcrypt'); // bcrypt 모듈 : 암호화
const dotenv = require('dotenv'); // dotenv 모듈
dotenv.config();
const saltRounds = Number(process.env.SALT_ROUNDS);

const join = (req, res) => {
    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    let values = [email, hashedPassword];

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.CREATED).json(results);
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        const loginUser = results[0];

        const matchedPassword = bcrypt.compareSync(password, loginUser.password);

        // 디비 비밀번호랑 비교
        if (loginUser && matchedPassword) {
            // 토큰 발행
            const token = jwt.sign(
                {
                    email: loginUser.email,
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: '5',
                    issuer: 'oneik',
                }
            );

            // 토큰 쿠키에 담기
            res.cookie('token', token, {
                httpOnly: true,
            });

            console.log(token);

            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end(); // 401 : Unauthorized(미인증 상태)
        }
    });
};

const passwordResetRequest = (req, res) => {
    const { email } = req.body;

    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        // 이메일로 유저가 있는지 찾아본다
        const user = results[0];
        if (user) {
            return res.status(StatusCodes.OK).json({
                email: email,
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
    });
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    let sql = 'UPDATE users SET password = ? WHERE email = ?';
    let values = [hashedPassword, email];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if (results.affectiedRows == 0) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        } else {
            return res.status(StatusCodes.OK).json(results);
        }
    });
};

module.exports = { join, login, passwordResetRequest, passwordReset };
