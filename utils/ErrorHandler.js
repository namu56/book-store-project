const { StatusCodes } = require('http-status-codes');

const handleQueryError = (err, res) => {
    console.log(err);
    return res.status(StatusCodes.BAD_REQUEST).end();
};

module.exports = { handleQueryError };
