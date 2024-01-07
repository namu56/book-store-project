const express = require('express');
const { addLike, removeLike } = require('../controllers/LikeController');
const router = express.Router();

router.post('/:book_id', addLike); // 좋아요 추가
router.delete('/:book_id', removeLike); // 좋아요 취소

module.exports = router;
