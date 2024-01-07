// express 모듈
const express = require('express');
const app = express();

// dotenv 모듈
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.listen(process.env.PORT);

const userRouter = require('./routes/users');
const bookRouter = require('./routes/books');
const categoryRouter = require('./routes/cagegory');
const cartRouter = require('./routes/carts');
const likeRouter = require('./routes/likes');
const orderRouter = require('./routes/orders');

app.use('/users', userRouter);
app.use('/books', bookRouter);
app.use('/category', categoryRouter);
app.use('/carts', cartRouter);
app.use('/likes', likeRouter);
app.use('/orders', orderRouter);
