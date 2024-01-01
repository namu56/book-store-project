const express = require('express'); // express 모듈
const router = express.Router();
const conn = require('../mariadb'); // db 모듈

const join = require('../controller/UserController');

// 회원 가입
router.post('/join', join);

// 로그인
router.post('/login', (req, res) => {
    res.json('로그인');
});

// 비밀번호 초기화 요청
router.post('/reset', (req, res) => {
    res.json('비밀번호 초기화 요청');
});

// 비밀번호 초기화
router.put('/reset', (req, res) => {
    res.json('비밀번호 초기화 수정');
});

module.exports = router;
